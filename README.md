# FinalProjectCN466
## เรื่อง การบอกอุณหภูมิภายในบ้านและนอกบ้านและให้คำแนะนำว่าควรเปิดแอร์หรือไม่
## Topic

    1.About
    
    2.Motivation
    
    3.Requirement
    
    4.Design
    
    5.Test
    
    6.DemoVideo
    
---------------------

## About

  โปรเจคนี้เป็นของวิชา CN466 อินเทอร์เน็ตของสรรพสิ่ง(Internet of Things) โดยมีความสามารถในการบอกถึงอุณหภูมิและความชื้นภายในบ้านและในละแวกที่ผู้ใช้อยู่
รวมถึงการที่สามารถแนะนำว่าผู้ใช้ควรเปิดแอร์ดีหรือไม่ จะคุ้มค่าหรือไม่

---------------------

## Motivation 

    1.ช่วยแนะนำการเปิดแอร์ว่าเมื่อเปิดแล้วจะคุ้มค่า
    
    2.ได้รับรู้ถถึงสภาพอาการภายในบ้านและจังหวัดที่อยู่
    
---------------------

## Requirement

สิ่งที่ต้องการในการทำงาน Software, Device, Service และอื่นๆ มีดังนี้

    1.Cucumber RS Board
    
    2.HiveMQ
    
    3.Edge Impulse
    
    4.LIFF UI
    
    5.Web API
    
    6.Cloud service
    
    7.Firebase
    
    8.MongoDB
    
1. Cucumber RS Board ทำหน้าที่ในการส่งข้อมูลอุณหภูมิและความชื้นไปที่ HiveMQ
2. HiveMQ ค่อยเป็นตัวกลางระหว่าง Cucumber RS Board กับ Server ที่จะมาดึงค่าจาก Borad ที่ Topic ที่กำหนดไว้
3. Edge Impulse เป็นตัวที่ใช้ในการ Train Mini Machine learning model เพื่อที่จะทำนายว่าควรจะเปิดแอร์หรือไม่
4. LIFF UI เป็นตัวที่แสดงผลออกมาเป็นหน้าเว๊บ ทำหน้าที่ในการแสดง List Feature ที่สามารถใช้ได้ผ่านทาง Line Chat Bot
5. Web API ใช้ในการเลือกค่าอุณหภูมิของจังหวัดที่ผู้ใช้อยู่ หรือ ต้องการรู้อุณหภูมิในเมืองอื่นๆทั้งของในไทยและต่างประเทศได้
6. Cloud service เป็น server ที่เป็นตัวกลางสำหรับเชื่อมโยงสิ่งต่างๆ เช่น Line bot, Firebase
7. Firebase เป็นตัวเก็บค่าอุณหภูมิและความชื้นปัจุบัน
8. MongoDB เป็นตัวเก็บค่าอุณหภูมิทั้งหมดที่ผ่านมา

---------------------

## Design

![DesignCN466](https://user-images.githubusercontent.com/60340123/146648086-65713cc8-046c-41b5-a899-b67e160c3057.png)

ใน Heroku มีการรวมกันระหว่าง Edge Impulse, Web API, LIFF UI

## Test

![TestCN466](https://user-images.githubusercontent.com/60340123/146650876-86733639-918a-470c-ba1c-d93d7b2820d1.png)

    โดยอุณหภูมิใน Web Api มีหน่วยเป็น Kevin ให้ลบ 272.15 เพื่อเป็นเซลเซียส
    
--------------------- 

## DemoVideo
คลิปสาธิตการทำงานของ Software และ Chatbot 

Link: [Click here](https://youtu.be/CMk1XC9nhw0)
    
    
