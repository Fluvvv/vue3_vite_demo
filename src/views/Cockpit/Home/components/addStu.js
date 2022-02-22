import { reactive } from "vue";

function useAdd(state) {
  const stu = reactive({
    id: "",
    name: "",
  });

  function addStu() {
    const stuC = Object.assign({}, stu);
    state.push(stuC);
    stu.id = "";
    stu.name = "";
  }
  return {
    stu,
    addStu,
  };
}
export default useAdd;
