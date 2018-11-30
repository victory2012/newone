<template>
  <div>
    <el-button @click="repairHandle"
      type="primary">{{$t('menu.repairGps')}}</el-button>
  </div>
</template>

<script>

export default {
  data () {
    return {

    };
  },
  mounted () { },

  methods: {
    repairHandle () {
      this.$api.repairGps().then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          if (res.data.data !== null) {
            this.$message.warning(res.data.data);
          }
        }
      });
    }
  }
};

</script>
<style lang='' scoped>
</style>
