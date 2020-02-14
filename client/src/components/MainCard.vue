<template>
  <div class="col-lg-3 col-sm-12">
    <mdb-container>
      <mdb-row>
        <mdb-col>
          <mdb-card wide>
            <mdb-view :gradient="bgnya" cascade>
              <h2 class="card-header-title mb-3">{{category}}</h2>
            </mdb-view>
            <mdb-card-body class="text-center" cascade>
              <MiniCard
                @updateStatus="emitGetLagi"
                v-for="onetask of datas"
                :task="onetask"
                :key="onetask.id"
              ></MiniCard>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>


<script>
import MiniCard from "./MiniCard";
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardImage,
  mdbCardHeader,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbCardUp,
  mdbCardAvatar,
  mdbCardGroup,
  mdbBtn,
  mdbView,
  mdbMask,
  mdbIcon
} from "mdbvue";
export default {
  name: "MainCard",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardImage,
    mdbCardHeader,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbCardUp,
    mdbCardAvatar,
    mdbCardGroup,
    mdbBtn,
    mdbView,
    mdbMask,
    mdbIcon,
    MiniCard
  },
  props: ["category", "datas"],
  methods: {
    log(evt) {
      window.console.log(evt);
      console.log(evt, "<< log");
    },
    tentuinBg() {
      if (this.category == "Backlog") {
        this.bgnya = "young-passion";
      } else if (this.category == "To do") {
        this.bgnya = "sunny-morning";
      } else if (this.category == "Doing") {
        this.bgnya = "tempting-azure";
      } else {
        this.bgnya = "dusty-grass";
      }
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    emitGetLagi() {
      this.$emit("sudahUpdate");
    }
  },
  data() {
    return {
      bgnya: "peach",
      drag: false
    };
  },
  created() {
    this.tentuinBg();
    // console.log(this.datas, "<< ini di main");
  },
  mounted() {
    this.tentuinBg();
  }
};
</script>

<style scoped>
h2 {
  color: white;
  text-align: center;
  vertical-align: middle;
}
</style>