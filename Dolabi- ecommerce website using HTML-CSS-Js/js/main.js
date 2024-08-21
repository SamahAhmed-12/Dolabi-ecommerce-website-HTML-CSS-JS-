let title = document.getElementById('title'); //بنادي علي العناصر
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let description = document.getElementById('description');
let total = document.getElementById('total');
let imageUpload = document.getElementById('imageUpload');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'; // معناة لما اعمل create ف ينتج منتج لكن لو جيت اعمل update ف يعدل ف المنتج 
let tmp; // دي متغير global بحيث يكون مرئ لكل ال funcyions ه يساعدني ف جزء ال update 

//console.log(title,price,taxes,ads,descount,total,count,category,submit)
//get total
function getTotal()// بعمل عملية جمع للمنتاجات الموجودة عندي
{
   if(price.value !=''){
    let result = (+price.value + +taxes.value )
     - +discount.value;
      total.innerHTML = result;
}
}
//creat product

let dataPro ;//save in local
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){  //هي دي function اللي من خلالها ب create منتج جديد
    let reader = new FileReader();
    reader.onload = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        description:description.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        image: reader.result
    }//count

{
    if(title.value !=''&& price.value !='' && category.value !='' &&newPro.count<20){
    if(mood ==='create'){
        if(newPro.count > 1){ //لو عدد منتجات اللي داخلة اكبر من 1 اعملي for loop للمنتاجات دي
            for(let i = 0; i < newPro.count;i++){
            dataPro.push(newPro); //عن طريق البوش بخلية يروح لل array و يضيف منتج جديد
            }
        }else{
    
            dataPro.push(newPro);
        }
        }else{
            dataPro[  tmp   ] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }

        clearData()
 }
    
}
     //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData() // بتعرض المنتجات
}
if (imageUpload.files.length > 0) {
    reader.readAsDataURL(imageUpload.files[0]);
} else {
    reader.onload();
}
}

//clear inputs
function clearData(){ // بعمل clesr لل data اللي موجودة ف tables بعد لما اضيف منتج جديد
title.value = '';
price.value = '';
taxes.value = '';
discount.value = '';
description.value = '';
total.innerHTML = '';
count.value = '';
imageUpload.value = ''; 
category.value = '';

}
//read 
function showData(){ // for loob للمنتاجات الي مخزنها في data عندي 
        let table = '';
        for(let i = 0; i< dataPro.length;i++){
            table += `
            
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
 <td><img src="${dataPro[i].image}" alt="${dataPro[i].title}" style="width:50px; height:50px;"></td>
            <td>${dataPro[i].description}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>     
            <td><button onclick="UpdateData(${i})" id="Update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
            </tr>

            `;
        }
      
      document.getElementById('tbody').innerHTML = table;
      //delete all  
     let btnDelete = document.getElementById('DeleteAll'); //هنا ب انادي علي delete all بحيث لو فية بيانات حط زرار لو مفيش متحطش 
if(dataPro.length > 0){ //بشوف ف array لو داتا فيها ب صفر هيبقا مفيهاش بيانات لو اكبر يبقا يبقا فيها 
// هنا ه ابدا اخلق الزرار 
       btnDelete.innerHTML = ` 
           <button onclick="DeleteAll()">DeleteAll(${dataPro.length})</button>
   
       ` 
}else{
   btnDelete.innerHTML='';

}

    }
    showData() //علشان البيانات متروحش لما اعمل reload

//delete لمنتج واحد بس 
function deleteData(i){
    dataPro.splice(i,1);//كدا انا بسمح من array بس 
    localStorage.product =  JSON.stringify(dataPro);   // هنا انا ب امسح من local storage و بعدين ضيف array جديدة بعد ما حذفت العنصر منها 
    showData() // بيمسح العنصر و يظهرها من ير ما اعمل reload
}

function DeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//update
function UpdateData(i){
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        discount.value = dataPro[i].discount;
        description.value = dataPro[i].description; 
        getTotal()
        count.style.display = 'none';
        category.value = dataPro[i].category;
        submit.innerHTML = 'Update';
        mood = 'Update';
        tmp = i; // كدا i مكشوفة ل كل ال functions

        let keepImage = confirm("Do you want to keep the current image?");
    if (!keepImage) {
        imageUpload.value = ''; // User wants to replace the image
    } else {
        // Keep the current image (no need to clear input)
        imageUpload.value = ''; // Still clear, as it can't be set
    }

scroll({
    top:0,
    behavior:'smooth',
})
}

//search
let searchMood = 'title';
function getsearchMood(id)// لو id اللي داخل ب title ف انا ه ادور علي اساسة غير كدا تدور ب ال category 
{
    let search = document.getElementById('search');
   if (id == 'searchTitle'){ 
    searchMood = 'title';
   
   }else{
    searchMood = 'category';
  
   }
   
   search.focus() // لما ادوس علي سيرش ب title , category يعمل focus علي ال search
   search.value = ''; // هناانا بعد لما اسرش ب title بعدين نقلت علي زرار ال category ف ه يفضي مربع السيرش 
   showData()
}

//عملية السيرش نفسها 
function searchData(value){ //كدا انا عملت زرار ف html line 35 لما اكتب فية يشغل ال function دي و ه اكون عاوز قيمة اللي فيها تيجي عندي هنا ف fuction
let table = '';
    if(searchMood == 'title') // هنا ه يكو البحث من خلال الtitle
{
for(let i = 0; i < dataPro.length;i++){ // عملت لووب علشان ادور علي كل العناصر اللي انا عاوزها جوا array 
//المنتجات موجودة عندي ف ال array ف اخل جوا ال index و دور علي title ب استخدام inlude
if (dataPro[i].title.includes(value)){
    table += `
            
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].discount}</td>
    <input type="file" id="imageUpload" accept="image/*">
    <td>${dataPro[i].description}</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].total}</td>
    <td><button onclick="UpdateData(${i})" id="Update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
    </tr>

    `;
   
}

}

}else{
    for(let i =0; i< dataPro.length;i++){ 
    if (dataPro[i].category.includes(value)){
        table += `  
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].discount}</td>
         <input type="file" id="imageUpload" accept="image/*">
        <td>${dataPro[i].description}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].total}</td> 
        <td><button onclick="UpdateData(${i})" id="Update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
    
        `;
       
    }
}

}
document.getElementById('tbody').innerHTML = table;
}

// clean data هنا انا ب اتحكم ف المنتجات اللي داخلة ف inputs
 