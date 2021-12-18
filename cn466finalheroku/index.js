const express = require('express');
const app = express();


const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com')
const topic = "cn466/final/pakcawat/temphum"

const { MongoClient } = require("mongodb");
var url = process.env.URL_MONGODB;
const clientMongo = new MongoClient(url);
const dbName = "test";
const axios = require('axios');

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": process.env.TYPE,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCwRruYLAYpF+h2\nGbjin/CZMfl/Ltchy2ieTagg2ior5pb+E9fiylpY/ipxi7m/7SYt1pRBxds3Srd7\nuHjZQxydZvgAateGeYUXU+lydGxqKI8VV5rZv6W50sWLqqWc24tnd/zKEiFRaDYN\nMSNcRXVXyV0nNtebfmSfSqPQozc8IjwpAcCnf/14TjmpJCqQnDo0qBEFlGhbw9Wb\nCjL69zv3U00R7N/5+b998ZkJA9NsHCBKyOlWYB+8lqV/UsKq0IrUcQ2IILFO9clt\nV2ckxCvObyrumPl/Z0o3QD7XNO/422v5DeLurc0dLRVi7NxySG9oIm5gFw1qMLTj\nZwqBcimvAgMBAAECggEAVNMMtZrFsiOTlLUm/0LIo+dk8HspQdVgeADVfU2OSobR\nNN12nucR184ivXXnwgALxbYCrK3Zob8+EPaBjMbbL7EbeRPwt4Cld0bFSPLWMrVm\nuPXpiYvL42IV9nH89MC+0eDuz4wu5T4Y+HsjUWUJJN+8iEC/Os90+yQPNTg9PZ1L\nKgX6z2DQU5OGey3NrojxAiXV2ladJyrdY24qsl05ka+5T6Ou2526QsMvirn4TRYY\nvH/QJRDrfjbXO1e7qlpWxH3VlcxicW3zLoko9AAdndVw7wyQnG+kc/feWPkrkyy/\nwcYvDJOxNdkhBVRrBR5i/rN62Un+FhkJNvq9dQho9QKBgQD1rnElNjbq60Tka8AZ\ntyXgKiMphi8byG8Z/Kiqc6DGHzJoc4rTgluSg2Wb+6OIGGR50CIcGzOZjwE7eBwg\nbYF9BeUDR9MVyKi3LxAyIoFq3CzuNWdv1aHPqB4XfRTQjrvm8gTWryiha84Qf/uK\nO3LoAeMSunELeiX1l1vpFe15MwKBgQC3rgyoRgSKzjzwpBzKYc/w5shk0cgBQA6B\n3BYYe0JpE3Yn8m2rRee2vgCXSXVToHUuU3SX4iboApDeZ4M08I2SCyXiPhyVYIba\n93xtDisu8J5XVC++EfuZe2zl1yXxT+BZZTMhfFO3T5FdiOtRxYBUdwbXz7T5LIuc\nfBRhi/DllQKBgQC4owoLgkwRjxDubgAoE1mWt3RHj721rpO4vwZvW4jXfLiggT0z\nKgPx/2gMqzhCXrqcRYxs/RBxdmThsanJwSKQuC5docwE0hHh4a/VTdNfYOsvdtku\n1inOazV6R5muB6c1sGtsgKUTc3ahNd3wDC+WJ1zlRVMR4hHHGaKMcNtQuwKBgDz0\nqMSrP9SkrrqZa+iJ300t+XDj4YDwth/IXxjOxvJCACMvo8+ECmqt0VpjiWkwRdMS\n5Q2GgqzaNSNprLRD5GeEBZV4UVoNR5OhMAys+A3C0nleud1U8G8186Su6quTe3uP\nRxGkxc9+u1oUFyvy5Cyjt4SlLITIkKhk0QqyO0alAoGBAMicjkfLWHo+lePCB5zf\npKgVylPVD4bQP+UQMP51YKt1pPFL001gqZlMxArvy9/jc4H5N0DV0XY1i8d7z8eg\nEK3fLqwgi0Hm+rXEzZK8Y4BR6gQ9/1Bmcs5S0FNpio9NojqCUpGIfxVRpRCfJDiG\nJcGijm1UA1S2o8WpDiwdYjKM\n-----END PRIVATE KEY-----\n",
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
  }
  ),
  databaseURL: process.env.URL_FIREBASE
});
const db = admin.database();


// line 
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const line = require('@line/bot-sdk');
const client_line = new line.Client(config);

const Module = require('./edge-impulse-standalone');
const fs = require('fs');

var jsons = null;
var vauletemp = null;
var vaulehum = null;
var realtimetemp = null;
var realtimehum = null;
var Outside_realtimetemp = null;
var Outside_realtimehum = null;
var predict = null;
var textpredict = null;
var guide = null;
var xtemp = null;
var yhum = null;




client.on('connect', () => {
  console.log('Connected')
  client.subscribe(topic, () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  payload = payload.toString()
  payload = JSON.parse(payload);
  vauletemp = payload.Temperature;
  vauletemp = parseFloat(vauletemp);
  vaulehum = payload.Humidity;
  vaulehum = parseFloat(vaulehum);
  console.log("get data")
  startAddData(vauletemp, vaulehum)

});



app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('GET request');
});

app.post('/', (req, res) => {
  res.send('POST request');
});


app.use('/lineliff', express.static('lineliff'));

function updateRealtimetemp() {
  db.ref('cucumber').get().then((snapshot) => {
    if (snapshot.exists()) {
      jsons = snapshot.toJSON()
      realtimetemp = jsons.Temperature;
      realtimehum = jsons.Humidity;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  axios.get('http://api.openweathermap.org/data/2.5/weather?q=Pathumthani&appid=a668c5435556dad665d1341486b0e39f')
    .then((res) => {
      Outside_realtimetemp = (res['data']['main']['temp'] - 272.15).toFixed(2);
      Outside_realtimehum = res['data']['main']['humidity'];

    })
};

function othertemphum(msg1) {
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + msg1 + '&appid=a668c5435556dad665d1341486b0e39f')
    .then((res) => {
      xtemp = (res['data']['main']['temp'] - 272.15).toFixed(2);
      yhum = res['data']['main']['humidity'];
    })
}

async function startAddData(vauleinputtemp, vauleinputhum) {

  db.ref('cucumber').set({
    Temperature: vauleinputtemp.toFixed(2),
    Humidity: vauleinputhum.toFixed(2),
  });

  try {

    var date = new Date();
    var date2 = new Date();

    console.log(vauleinputtemp.toFixed(2));
    console.log(vauleinputhum.toFixed(2));

    await clientMongo.connect();
    console.log("Connected correctly to server");
    const db = clientMongo.db(dbName);

    // Use the collection "people"
    const col = db.collection("people2");
    date.setHours(date.getHours() + 7);
    date.setDate(date.getDate() + 7);
    date.setMinutes(date.getMinutes() + 50);

    date2.setHours(date2.getHours() + 7);
    col.createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 })
    col.insertOne({
      "expireAt": date,
      "Temperature": vauleinputtemp.toFixed(2),
      "Humidity": vauleinputhum.toFixed(2),
      "date": date2,
    })

    col.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });


  } catch (err) {
    console.log(err.stack);
  }

  finally {
    console.log("success")
  }

  vauletemp = null;
  vaulehum = null;
}

function usemodel() {

  // Classifier module
  let classifierInitialized = false;
  Module.onRuntimeInitialized = function () {
    classifierInitialized = true;
  };

  class EdgeImpulseClassifier {
    _initialized = false;

    init() {
      if (classifierInitialized === true) return Promise.resolve();

      return new Promise((resolve) => {
        Module.onRuntimeInitialized = () => {
          resolve();
          classifierInitialized = true;
        };
      });
    }

    classify(rawData, debug = false) {
      if (!classifierInitialized) throw new Error('Module is not initialized');

      const obj = this._arrayToHeap(rawData);
      let ret = Module.run_classifier(obj.buffer.byteOffset, rawData.length, debug);
      Module._free(obj.ptr);

      if (ret.result !== 0) {
        throw new Error('Classification failed (err code: ' + ret.result + ')');
      }


      let jsResult = {
        anomaly: ret.anomaly,
        results: []
      };

      for (let cx = 0; cx < ret.size(); cx++) {
        let c = ret.get(cx);
        jsResult.results.push({ label: c.label, value: c.value, x: c.x, y: c.y, width: c.width, height: c.height });
        c.delete();
      }

      ret.delete();

      return jsResult;
    }

    getProperties() {
      return Module.get_properties();
    }

    _arrayToHeap(data) {
      let typedArray = new Float32Array(data);
      let numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
      let ptr = Module._malloc(numBytes);
      let heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
      heapBytes.set(new Uint8Array(typedArray.buffer));
      return { ptr: ptr, buffer: heapBytes };
    }
  }


  /* input */
  let features = realtimetemp;
  if (fs.existsSync(features)) {
    features = fs.readFileSync(features, 'utf-8');

  }

  // Initialize the classifier, and invoke with the argument passed in
  let classifier = new EdgeImpulseClassifier();
  classifier.init().then(async () => {
    let result = classifier.classify(features.trim().split(',').map(n => Number(n)));

    getdata(parseFloat(result['results'][0].value));

  }).catch(err => {
    console.error('Failed to initialize classifier', err);
  });
}

function getdata(data) {
  predict = data
}


async function handleEvent(event) {
  if (true) {
    updateRealtimetemp();
    usemodel();
  }

  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var msg = {
    type: 'text',
    text: 'สวัสดีครับ บอทนี้สามารถบอกอุณหภูมิ ความชื้น ได้'
  }

  var msg1 = event.message.text.toLowerCase();

  if (msg1 === 'อุณหภูมิ') {
    if (predict > 0.99) {
      textpredict = "ไม่ควรเปิดแอร์"
    } else { textpredict = "ควรเปิดแอร์" }

    if (Outside_realtimetemp < realtimetemp) {
      guide = "  แต่อุณหภูมินอกบ้านของคุณน้อยกว่าในบ้านแค่เปิดหน้าต่างก็อาจเย็นขึ้นได้"
    } else { guide = "" }

    try {
      msg = [
        {
          "type": "text",
          "text": "อุณหภูมิในอากาศในบ้าน " + parseFloat(realtimetemp) + " C"

        }
        , {
          "type": "text",
          "text": "อุณหภูมิในอากาศนอกบ้าน " + parseFloat(Outside_realtimetemp).toFixed(2) + " C"
        }, {
          "type": "text",
          "text": textpredict + guide
        }
      ];
    }
    catch (e) {
      var msg = {
        type: 'text',
        text: 'ไม่มีข้อมูล'
      }
      console.log(e);
    }
    finally {
      console.log("entering and leaving the finally block");
    }


    return client_line.replyMessage(event.replyToken, msg);
  }


  else if (msg1 === 'ความชื้น') {

    try {
      msg = [
        {
          "type": "text",
          "text": "ความชื้นในอากาศในบ้าน " + realtimehum + " %"
        }
        , {
          "type": "text",
          "text": "ความชื้นในอากาศนอกบ้าน " + parseFloat(Outside_realtimehum).toFixed(2) + " %"
        }

      ];
    }
    catch (e) {
      var msg = {
        type: 'text',
        text: 'ไม่มีข้อมูล'
      }
      console.log(e);
    }
    finally {
      console.log("entering and leaving the finally block");
    }
    return client_line.replyMessage(event.replyToken, msg);
  }
  else if (msg1.includes("$")) {

    msg1 = msg1.substring(1);
    othertemphum(msg1);

    try {
      msg = [
        {
          "type": "text",
          "text": "อุณหภูมิจัดหวัด" + msg1 + " = " + xtemp + " C"
        }
        , {
          "type": "text",
          "text": "ความชื้นจัดหวัด" + msg1 + " = " + yhum + " %"
        }

      ];
    }
    catch (e) {
      var msg = {
        type: 'text',
        text: 'ไม่มีข้อมูล'
      }
      console.log(e);
    }
    finally {
      console.log("entering and leaving the finally block");
    }
    return client_line.replyMessage(event.replyToken, msg);
  }



  else {
    var msg = { type: 'text', text: 'โปรดดูการใช้งานในไลน์รีสเมนูครับ' }
    return client_line.replyMessage(event.replyToken, msg);
  }

}


const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});


