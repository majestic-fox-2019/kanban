<template>
    <div class="kanban-category">
        <div
            class="modal fade"
            id="addModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Add Task
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form
                            method="POST"
                            v-on:submit.prevent="addOne(category)"
                        >
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1"
                                    >Fill your task</label
                                >
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    v-model="title"
                                ></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Save changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="kanban-category-title">
            <h2>{{ tasks.value }}</h2>
        </div>
        <div class="kanban-cards-container">
            <div v-for="(task, i) in tasks.task" :key="i">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ task.title }}</h5>
                    </div>
                    <div
                        class="card-footer text-muted"
                        v-if="checkid(task.UserId)"
                    >
                        <i
                            class="fas fa-trash"
                            v-on:click="deleteOne(task.id)"
                        ></i>
                        <i
                            class="fas fa-arrow-left"
                            v-on:click="stepback(task.id)"
                            v-if="checkzero(category)"
                        ></i>
                        <i
                            class="fas fa-arrow-right"
                            v-if="checkdone(category)"
                            v-on:click="stepforward(task.id)"
                        ></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="addTaskButton" v-if="category == 0">
            <button
                type="button"
                class="btn btn-primary addButton"
                data-toggle="modal"
                data-target="#addModal"
            >
                Add Task
            </button>
        </div>
    </div>
</template>

<script>
import Display from "./displaypage";
import axios from "axios";
export default {
    props: ["categorytitle", "tasks", "category"],
    data() {
        return {
            title: null,
            addIndex: null,
            status: null,
            userId: localStorage.UserId
        };
    },
    methods: {
        checkid(userid) {
            if (userid == this.userId) {
                return true;
            }
            return false;
        },
        checkzero(params) {
            if (params === 0) {
                return false;
            }
            return true;
        },
        checkdone(params) {
            if (params === 3) {
                return false;
            }
            return true;
        },
        stepback(id) {
            axios({
                method: "PUT",
                url: `http://localhost:3000/task/${id}`,
                data: {
                    progress: -1
                }
            })
                .then(res => {
                    this.$emit("showAllTask");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        stepforward(id) {
            axios({
                method: "PUT",
                url: `http://localhost:3000/task/${id}`,
                data: {
                    progress: 1
                },
                headers: { token: localStorage.token }
            })
                .then(res => {
                    this.$emit("showAllTask");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getStatus(status) {
            this.status = status;
        },
        addOne(status) {
            axios({
                method: "POST",
                url: `http://localhost:3000/task`,
                data: {
                    title: this.title,
                    status: 0,
                    UserId: this.userId
                },
                headers: { token: localStorage.token }
            })
                .then(res => {
                    this.$emit("showAllTask");
                    $("#addModal").modal("hide");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteOne(id) {
            axios({
                method: "DELETE",
                url: `http://localhost:3000/task/${id}`,
                headers: { token: localStorage.token }
            })
                .then(res => {
                    this.$emit("showAllTask");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.userId = localStorage.UserId;
    }
};
</script>

<style></style>
