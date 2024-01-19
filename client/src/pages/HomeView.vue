<template>
    <div class="flex justify-center flex-col">
       <div>
           <Banner/>
       </div>
       <div class="flex md:container justify-between  py-4 w-full ">
        <ul class="flex  items-center  w-full">
            <li class="w-full flex justify-center items-center gap-3"><img src="../assets/icon/icon-truck.png" alt="" class="w-3  ">
                <div class="flex flex-col">
                <span class="font-extrabold">Miễn phí ship</span>
                <p class="text-[14px font-sans] text-[#90908E]">Đơn hàng trên 1 triệu</p></div>
            </li>
            <li class="w-full flex justify-center  items-center gap-3"><img src="../assets/icon/icon-bag.png" alt="" class="w-3  ">
                <div class="flex flex-col">
                    <span>Miễn phí trả hàng</span>
                    <p class="text-[14px font-sans] text-[#90908E]">Trong 30 ngày</p>
                </div>
            </li>
            <li class="w-full flex justify-center  items-center gap-3"><img src="../assets/icon/icon-purchase.png" alt="" class="w-3">

                <div class="flex flex-col">
                    <span>Nhận ưu Đãi 20%</span>
                    <p class="text-[14px font-sans] text-[#90908E]">Khi đăng ký thành viên</p>
                </div>
            </li>
            <li class="w-full flex justify-center  items-center gap-3"><img src="../assets/icon/call.png" alt="" class="w-3 ">

               <div class="flex flex-col">
                <span>Hỗi trợ 24/24</span>
                <p class="text-[14px font-sans] text-[#90908E]">Dịch vụ Hỗ trợ 24/24</p>
               </div>
            </li>
        </ul>
       </div>
       <div>
         <h1>Danh Mục Nổi Bật</h1>
       </div>
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue';
    export default {
        components:{Banner},
        data(){

        }
    }
</script>

<style lang="scss" scoped>

</style>