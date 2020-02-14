import Vue from "vue";
import App from "../components/App.vue";

new Vue({ render: createElement => createElement(App) }).$mount("#app");

// <div class="category" v-for="content in taskCategory">
//     <div class="kanban-column">
//         <div class="text">
//             {{content.nameCategory}}
//         </div>
//         <!-- content -->
//         <div class="kanban-content whatever">
//             <div class="isiKanban" v-for='task in content.Tasks'>
//                 {{task.title}}
//                     <div class="button-x" alyv-model="buttonId[task.id]">
//                         <button type="" class="button-close">
//                             <div>
//                                 <span>x</span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//         </div>
//     </div>
//     <div>
//         <form action="" @submit.prevent="addData(content.nameCategory, content.id)">
//             <input class="addInput" v-model="title[content.nameCategory]" type="text">
//             <button class="btn fourth" type="submit">add a card... </button>
//         </form>
//     </div>
// </div>
