<template>
  <div class="content">
    <Navbar v-bind:logout="logout"></Navbar>
    <main>
      <Category
        v-for="(category, i) in categories"
        v-bind:category="category"
        v-bind:updateCategory="updateCategory"
        v-bind:deleteCategory="deleteCategory"
        v-bind:i="i"
        v-bind:addTask="addTask"
        v-bind:goLeft="goLeft"
        v-bind:goRight="goRight"
        v-bind:editTask="editTask"
        v-bind:deleteTask="deleteTask"
        v-bind:key="category.id"
        v-bind:length="categories.length"
      ></Category>
      <AddCategory v-bind:addCategory="addCategory"></AddCategory>
    </main>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Category from "./Category";
import AddCategory from "./AddCategory";
export default {
  name: "Content",
  props: [
    "categories",
    "updateCategory",
    "deleteCategory",
    "addTask",
    "goLeft",
    "goRight",
    "editTask",
    "deleteTask",
    "addCategory",
    "logout"
  ],
  components: {
    Navbar,
    Category,
    AddCategory
  }
};
</script>

<style>
</style>