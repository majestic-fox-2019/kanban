<template>
  <nav>
  <ul>
    <li v-for="(forProject, i) in forProjects" :key="i" @click="selectProject(forProject.name, forProject.projectId, forProject.leader)">
        <span>{{forProject.name}}</span>
        </li>
  </ul>
</nav>
</template>

<script>
export default {
props: {
    forProjects: {
        type: Array
    }
},
methods: {
	selectProject(name, id, leader){
		this.$emit('clickedProject', {name, id, leader})
	}
}
}
</script>

<style scoped>
nav ul {
	list-style-type: none;
	padding: 0;
}

nav ul li {
	font-size: 40px;
	font-family: sans-serif;
	background-color: white;
	border: 2px solid black;
	letter-spacing: 0.1em;
	width: 5em;
	height: 1.5em;
	line-height: 1.5em;
	position: relative;
	overflow: hidden;
	margin: 0.5em;
	cursor: pointer;
}

nav ul li span {
	color: white;
	mix-blend-mode: difference;
}

nav ul li::before {
	content: '';
	position: absolute;
	width: 1.5em;
	height: inherit;
	background-color: black;
	border-radius: 50%;
	top: 0;
	left: -0.75em;
	transition: 0.5s ease-out;
}

nav ul li:hover::before {
	transform: scale(7);
}

</style>