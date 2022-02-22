import { reactive } from "vue";

function useRem() {
  let state = reactive([
    { id: 1, name: "zs" },
    { id: 2, name: "ls" },
  ]);
  function remStu(index) {
    state.splice(index, 1);
  }
  return {
    state,
    remStu,
  };
}
export default useRem;
