<script>
  import pageList from './pageList'
  import { createMicroApp } from '@/config'

  export default {
    data() {
      return {
        pageList
      }
    },
    methods: {
      openLink(page) {
        let {path, query, title, single} = page
        createMicroApp(path).then(res => {
          if (single) {
            this.$router.push(path)
            return
          }
          this.$tabs.openTab({
            title,
            path,
            query
          })
        })
      }
    },
    mounted() {
    },
    render() {
      const {pageList, openLink} = this
      return (
        <div>
          {
            pageList.map(page => {
              return (
                <div onClick={() => {openLink(page)}}>{page.title}</div>
              )
            })
          }
        </div>
      )
    }
  }
</script>

<style lang="less" scoped>
  .index {
    width: 1200px;
    margin: 0 auto;

    .list {
      padding: 12px 0;
      display: flex;

      .list-item {
        cursor: pointer;
        padding: 20px;
        color: #2979ff;
      }
    }
  }
</style>
