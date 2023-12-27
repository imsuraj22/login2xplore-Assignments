# Student Enrollment Form

## Overview

This Student Enrollment Form is specifically designed to interact with the STUDENT-TABLE relation in the JsonPowerDB database. Utilizing the capabilities of JsonPowerDB, the form enables users to seamlessly input and manage student information, including Roll Number, Full Name, Class, Birth Date, Address, and Enrollment Date.

## JsonPowerDB Integration

JsonPowerDB is leveraged as the underlying database, providing a high-performance, lightweight, and serverless solution. The form utilizes JsonPowerDB's REST API services to store and retrieve data efficiently. The key features of JsonPowerDB, such as its proprietary algorithm for high-performance CRUD operations, serverless support, and pluggable API framework, contribute to a robust and dynamic data management experience.

## Form Behavior

- Upon page load or any control button click, an empty form will be displayed with the cursor positioned in the Roll Number field.
- Initially, all fields (except Roll Number) and buttons are disabled.
- If the entered Roll Number does not exist in the JsonPowerDB, the [Save] and [Reset] buttons are enabled. Users can enter data in the form and click [Save] to store the data in JsonPowerDB.
- If the Roll Number exists in JsonPowerDB, the form is populated with the existing data. The [Update] and [Reset] buttons are enabled, allowing users to modify the information. Clicking [Update] will update the data in JsonPowerDB.

## Form Fields

1. **Roll Number (Primary Key)**
2. **Full Name**
3. **Class**
4. **Birth Date**
5. **Address**
6. **Enrollment Date**

## Control Buttons

- **[Save]:** Saves new data to JsonPowerDB or updates existing data.
- **[Update]:** Updates data in JsonPowerDB when editing existing records.
- **[Reset]:** Resets the form or reverts to the initial state.

## Form Validation

- Data entry in the form should be valid, i.e., no empty fields are allowed.

## Usage Instructions

1. Open the form, and the cursor will be in the Roll Number field.
2. Enter a Roll Number:
    - If it does not exist, [Save] and [Reset] buttons will be enabled. Proceed to enter data.
    - If it exists, the form will be populated, and [Update] and [Reset] buttons will be enabled. Modify the data as needed.
3. Click [Save] to store new data or update existing data in JsonPowerDB.
4. Click [Reset] to clear the form or revert to the initial state.

## Screen Shots
![image](https://github.com/imsuraj22/login2xplore-Assignments/assets/100610668/6f8141d4-bdb2-49ca-8067-3c9231626e87)

![image](https://github.com/imsuraj22/login2xplore-Assignments/assets/100610668/40ea0975-4e4c-4aa3-bf32-0ad8aca9d0e1)


