import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
export function userPageCommunication() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleReSet = () => {
    pageContentRef.value?.getPageList()
  }
  const handleSearch = (searchInfo: object) => {
    console.log(pageContentRef)
    console.log(searchInfo)
    console.log(pageContentRef.value)
    pageContentRef.value?.getPageList(searchInfo)
  }
  return { pageContentRef, handleReSet, handleSearch }
}
