/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseUrl=' http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var stdDBName='StudentData';
var stdRelation='STD-REL';
var connectToken='90931926|-31949300025525071|90960814';



function resetForm() {
    $('#rollno').val("");
    $('#sname').val("");
    $('#classs').val("");
    $('#dob').val("");
    $('#address').val("");
    $('#edate').val("");
    $('#rollno').prop("disabled",false)
    $('#save').prop("disabled",true)
    $('#change').prop("disabled",true)
    $('#reset').prop("disabled",true)
    $('#rollno').focus();
   
}

function saveData(){

    var jsonStrObj=validateData();
    if(jsonStrObj===''){
        return "";
    }
    var putRequest=createPUTRequest(connectToken,jsonStrObj,stdDBName,stdRelation);
    jQuery.ajaxSetup({async:false});
    var resjsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async:true})
    resetForm();
    $('#rollno').focus();
}

function validateData(){
   
    var rollno,sname,classs,dob,address,edate;
    rollno=$('#rollno').val();
    sname=$('#sname').val();
    classs=$('#classs').val();
    dob=$('#dob').val();
    address=$('#address').val();
    edate=$('#edate').val();
    
    if(rollno===''){
        alert("Roll No Missing");
        $('#rollno').focus();
        return "";
    }
    if(sname===''){
        alert("Student Name Missing");
        $('#sname').focus();
        return "";
    }
    if(classs===''){
        alert("Class is Missing");
        $('#classs').focus();
        return "";
    }
    if(dob===''){
        alert("Date of Birth Missing");
        $('#dob').focus();
        return "";
    }
    if(address===''){
        alert("Address Missing");
        $('#address').focus();
        return "";
    }
    if(edate===''){
        alert("Enrollment date Missing");
        $('#edate').focus();
        return "";
    }
    
    var jsonStrObj={
        id:rollno,
        name:sname,
        class:classs,
        DOB:dob,
        address:address,
        Enrollment_date:edate
    };
    return JSON.stringify(jsonStrObj);
    
}
function changeData(){
    $('#change').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connectToken,jsonChg,stdDBName,stdRelation,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}

function getRoll(){
    var empIdJsonObj=getEmpIdAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connectToken,stdDBName,stdRelation,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseUrl,jpdbIRL);
     jQuery.ajaxSetup({async:true});
     if(resJsonObj.status===400){
         $('#save').prop('disabled',false);
         $('#reset').prop('disabled',false);
         $('#sname').focus();
     }else if(resJsonObj.status===200){
         $('#rollno').prop('disabled',true);
         fillData(resJsonObj);
         $('#change').prop('disabled',false);
         $('#reset').prop('disabled',false);
          $('#sname').focus();
     }
}

function getEmpIdAsJsonObj(){
    var rollno=$('#rollno').val();
    var jsonStr={
        id:rollno
    };
    return JSON.stringify(jsonStr);
    
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $('#sname').val(data.name);
    $('#classs').val(data.class);
    $('#dob').val(data.DOB);
    $('#address').val(data.address);
    $('#edate').val(data.Enrollment_date);
}

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}