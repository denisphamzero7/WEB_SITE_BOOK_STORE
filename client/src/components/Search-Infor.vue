<template>
  <div class="flex items-center h-[40px] w-full">
    <div class="border min-h-full h-full rounded-l-xl bg-slate-100">
      <label for="underline_select" class="sr-only pr-2"
        >Danh mục sản phẩm
      </label>
      <select
        id="underline_select"
        class="px-2 h-full w-full text-sm text-gray-500 bg-transparent appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        <option selected>chọn danh mục</option>
        <option value="US">sách ngoại ngữ</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      
    </div>

    <div
      class="min-h-full h-full rounded-r-xl border border-l-0 flex items-center"
    >
      <input
        type="text"
        placeholder="tìm kiếm sách"
        class="outline-none px-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
