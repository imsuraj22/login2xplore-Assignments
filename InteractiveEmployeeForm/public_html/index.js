/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseUrl=' http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var empDBName='EmployeeData';
var empRelation='EMP-REL';
var connectToken='90931926|-31949300025525071|90960814';



function resetForm() {
    $('#empid').val("");
    $('#empname').val("");
    $('#empsal').val("");
    $('#hra').val("");
    $('#da').val("");
    $('#deduct').val("");
    $('#empid').prop("disabled",false)
    $('#save').prop("disabled",true)
    $('#change').prop("disabled",true)
    $('#reset').prop("disabled",true)
    $('#empId').focus();
   
}

function saveData(){
     console.log("entered in save data");
    var jsonStrObj=validateData();
    if(jsonStrObj===''){
        return "";
    }
    var putRequest=createPUTRequest(connectToken,jsonStrObj,empDBName,empRelation);
    jQuery.ajaxSetup({async:false});
    var resjsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async:true})
    resetForm();
    $('#empid').focus();
}

function validateData(){
    console.log("entered in validate");
    var empid,empname,empsal,hra,da,deduct;
    empid=$('#empid').val();
    empname=$('#empname').val();
    empsal=$('#empsal').val();
    hra=$('#hra').val();
    da=$('#da').val();
    deduct=$('#deduct').val();
    
    if(empid===''){
        alert("Employee Id Missing");
        $('#empid').focus();
        return "";
    }
    if(empname===''){
        alert("Employee Name Missing");
        $('#empname').focus();
        return "";
    }
    if(empsal===''){
        alert("Employee Salary Missing");
        $('#empsal').focus();
        return "";
    }
    if(hra===''){
        alert("Employee hra Missing");
        $('#hra').focus();
        return "";
    }
    if(da===''){
        alert("Employee da Missing");
        $('#da').focus();
        return "";
    }
    if(deduct===''){
        alert("Employee deduct Missing");
        $('#deduct').focus();
        return "";
    }
    
    var jsonStrObj={
        id:empid,
        name:empname,
        salary:empsal,
        hra:hra,
        da:da,
        deduction:deduct
    };
    return JSON.stringify(jsonStrObj);
    
}
function changeData(){
    $('#change').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connectToken,jsonChg,empDBName,empRelation,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#empid').focus();
}

function getEmp(){
    var empIdJsonObj=getEmpIdAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connectToken,empDBName,empRelation,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseUrl,jpdbIRL);
     jQuery.ajaxSetup({async:true});
     if(resJsonObj.status===400){
         $('#save').prop('disabled',false);
         $('#reset').prop('disabled',false);
         $('#empname').focus();
     }else if(resJsonObj.status===200){
         $('#empid').prop('disabled',true);
         fillData(resJsonObj);
         $('#change').prop('disabled',false);
         $('#reset').prop('disabled',false);
          $('#empname').focus();
     }
}

function getEmpIdAsJsonObj(){
    var empid=$('#empid').val();
    var jsonStr={
        id:empid
    };
    return JSON.stringify(jsonStr);
    
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $('#empname').val(data.name);
    $('#empsal').val(data.salary);
    $('#hra').val(data.hra);
    $('#da').val(data.da);
    $('#deduct').val(data.deduction);
}

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}