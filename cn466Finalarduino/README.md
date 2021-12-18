# CN466-Final Project ส่วนของ Cucumber RS board

## Cucumber RS board

#### หน้าที่

วัดค่า Temperature และ Humidity จากนั้นทำการส่งค่าที่วัดได้ไปที่ Topic ทาง HiveMQ MQTT protocol

#### การทำงาน
    
    1. ทำการวัดค่า อุณหภูมิและความชื้น จากนั้นส่งไปที่ Topic: cn466/final/pakcawat/temphum ของ HiveMQ
    
    2. เมื่ออุณหภูมิสูงกว่า 27 C จะมีการแสดงไฟ LCD เป็นสีแดง ถ้าน้อยกว่า 27 C จะเป็นสีฟ้า
    
    3. โดยการทำงานทั้งหมดจะทำทุกๆ 15 วินาที
