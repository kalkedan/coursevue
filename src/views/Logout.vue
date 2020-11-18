<script>
import Utils from '@/config/utils';
export default {
   data() {
        return {
          user : {}
        };
   },
  created ()  {
    this.user = Utils.getStore("user");
    Utils.setStore("user",null);
     this.$router.push({ name: 'home' });
  }
  }
 
</script>