<template>
  <nav>
        <div class="logo">
            <h3 class="logo-font">kanban</h3>
        </div>
        <div class="menu">
            <ul>
                <li><a class="btn create" href="#">create</a></li>
                <li><a class="btn log-out" href="#">log-out</a></li>
                <li><a class="btn login" href="#">login</a></li>
            </ul>
        </div>
      </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../../style/_variables.scss"; 
nav {
    width: 100%;
    padding: 30px;
    background-color: $nav-color;
    display: flex;
    justify-content: space-between;
    .menu {
        ul {
            display: flex;
            .btn {
                margin-right: 3rem; 
                font-size: 2rem;
                color: $white-color;
                
            }
            .btn:link, .btn:visited{
                text-transform: uppercase;
                text-decoration: none;
                padding: 10px;
                border: 1px solid $white-color;
                // border-radius: 5px;
                transition: all .2s;
            }
            .btn:hover {
                box-shadow: 0 0.4rem 0.6rem $second-blend-color;
            }
        }
    }
    .logo-font {
        color: $white-color;
        font-weight: 700;
        font-size: 3rem;
        text-transform: uppercase;   
        transition: all .2s;
    }
    :hover {
        color: $dark-color;
    }
}
</style>