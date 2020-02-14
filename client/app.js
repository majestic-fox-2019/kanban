import Vue from 'vue';
import App from './app.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
const server = 'http://localhost:3000'
const socket = io('http://localhost:3000');
 
Vue.use(VueSocketIOExt, socket);
new Vue({ 
    render: createElement => createElement(App) 
    }).$mount('#app');

// var app = new Vue({
//     el: '#app',
//     data: {
//       tasks:[],
//       categoryIndex:null,
//       form:{title:null,description:null},
//       formUpdate:{id:null,title:null,description:null,category:null},
//       formLogin:{email:null,password:null},
//       formRegister:{email:null,password:null,username:null},
//       taskId:null,
//       indexEdit:null
//     },
//     created(){
//          this.showList()   
//         },
//     methods:{
//         login:function(){
//             console.log(this.formLogin)
//             axios({
//                 method:'post',
//                 url:`${server}/user/login`,
//                 data:this.formLogin
//             })
//             .then(data=>{
//                 localStorage.setItem("token",data.data)
//                 // console.log("berhasil")
//             })
//             .catch(err=>{

//             })
//         },
//         register:function(){
//             axios({
//                 method:"post",
//                 url:`${server}/user/register`,
//                 data:this.formRegister
//             })
//             .then(data=>{
                
//             })
//             .catch(err=>{
                
//             })
//         },
//         showList:function(){
//             axios({
//                 method:'get',
//                 headers:{token:localStorage.token},
//                 url:`${server}/tasks`
//             })
//             .then(data=>{
//                 this.tasks = data.data
//                 console.log(data.data)
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         },
//         getCategory:function(category){
//             this.categoryIndex = category
//             console.log(this.categoryIndex)
//         },
//         deleteTask:function(id){
//             axios({
//                 method:"delete",
//                 headers:{token:localStorage.token},
//                 url:`${server}/tasks/${id}`
//             })
//             .then(data=>{
//                 this.showList()
//                 console.log(data)
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         },
//         addTask:function(e){
//             axios({
//                 method:"POST",
//                 headers:{token:localStorage.token},
//                 url:`${server}/tasks`,
//                 data:{
//                     title:this.form.title,
//                     description:this.form.description,
//                     category:this.categoryIndex
//                 }
//             })
//             .then(data=>{
//                 console.log(data)
//                 this.showList()
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         },
//         getId(id){
//             this.taskId = id
//             this.formUpdate = Object.assign({},this.tasks[id])
//         },
//         updateTask(){
//             axios({
//                 method:"put",
//                 headers:{token:localStorage.token},
//                 url:`${server}/tasks/${this.formUpdate.id}`,
//                 data:{
//                     title:this.formUpdate.title,
//                     description:this.formUpdate.description,
//                     category:this.formUpdate.category
//                 }
//             })
//             .then(data=>{
//                 console.log(data)
//                 this.showList()
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         }
//     }
//   })