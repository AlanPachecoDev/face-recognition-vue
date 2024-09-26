<template>
  <div class="login-box">
    <h2>Register</h2>
    <form>
      <div class="user-box">
        <input v-model="user.email" type="text" name="Email" required="">
        <label>Email</label>
      </div>
      <div class="user-box">
        <input v-model="user.password" type="password" name="Password" required="">
        <label>Password</label>
      </div>
      <div class="user-box">
        <input v-model="user.name" type="text" name="Name" required="">
        <label>Name</label>
      </div>
      <div class="user-box">
        <input v-model="user.lastname" type="text" name="Lastname" required="">
        <label>Lastname</label>
      </div>


      <div id="uploader">
        <div class="row uploadDoc">
          <div class="col-sm-3">
            <div class="docErr"  >Por favor seleccione una imagen válida</div><!--error-->
            <div class="fileUpload btn btn-orange">
              <!-- <img src="https://image.flaticon.com/icons/svg/136/136549.svg" class="icon"> -->
              <span class="upl" id="upload" style="background-color: white">Seleccione su foto</span>
              <input type="file" class="upload up" id="up" @change="onFileChange" />
            </div><!-- btn-orange -->
          </div><!-- col-3 -->
        </div><!--row-->
      </div><!--uploader-->



      <a @click="submit()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
  </div>

  <div class="burbujas">
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
  </div>

  <div class="burbujas">
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
  </div>

</template>

<script>

import {createUser} from '../firebase/manageUsers.js';
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        lastname: "",
        image: "",
      }
    }

  },
  methods: {
    async submit() {
      console.log("User: ", this.user);
      const res = await createUser(this.user);
      console.log("RES: ", res);
      this.$router.push('/faceDetector');
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.user.image = file;
    },
  }
}
</script>


<style>

.burbuja{
    position: fixed;

    left:10%;
    bottom:10%;

    width:10px;
    height:10px;
    
    border-radius: 10px;

    margin-left:10%;
    background-color: aqua;
    opacity: 0.01;

    animation: bublesAnimation 15s linear infinite;
    z-index: -1;
}

.burbuja:nth-child(2){
    left:20%;
    bottom:10%;

    width:30px;
    height:30px;
    
    border-radius: 30px;

    animation-duration: 30s;
    animation-delay: 2s;
}
.burbuja:nth-child(3){
    left:30%;
    bottom:10%;

    width:15px;
    height:15px;
    
    border-radius: 15px;

    animation-duration: 20s;
    animation-delay: 1s;
}
.burbuja:nth-child(4){
    left:40%;
    bottom:10%;

    width:25;
    height:25;
    
    border-radius: 25;

    animation-duration: 8s;
    animation-delay: 3s;
}
.burbuja:nth-child(5){
    left:50%;
    bottom:10%;

    width:33px;
    height:33px;
    
    border-radius: 33px;

    animation-duration: 40s;
    animation-delay: 2s;
}
.burbuja:nth-child(6){
    left:60%;
    bottom:10%;

    width:18px;
    height:18px;
    
    border-radius: 18px;

    animation-duration: 25s;
    animation-delay: 4s;
}
.burbuja:nth-child(7){
    left:70%;
    bottom:10%;

    width:5px;
    height:5px;
    
    border-radius: 5px;

    animation-duration: 28s;
    animation-delay: 2s;
}
.burbuja:nth-child(8){
    left:80%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 37s;
    animation-delay: 3s;
}

/* Second group */
.burbuja2{
    position: fixed;

    left:10%;
    bottom:10%;
    width:10px;
    height:10px;
    border-radius: 10px;

    margin-left:10%;
    background-color: rgb(25, 217, 211);
    opacity: 0.01;

    animation: bublesAnimation2 15s linear infinite;
    z-index: -1;
}

.burbuja2:nth-child(1){
    left:5%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 22s;
    animation-delay: 3s;
}
.burbuja2:nth-child(2){
    left:-10%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 29s;
    animation-delay: 2s;
}
.burbuja2:nth-child(3){
    left:15%;
    bottom:10%;
    width:27px;
    height:27px;    
    border-radius: 27px;
    animation-duration: 34s;
    animation-delay: 1s;
}
.burbuja2:nth-child(4){
    left:-5%;
    bottom:10%;
    width:27px;
    height:27px;    
    border-radius: 27px;
    animation-duration: 39s;
    animation-delay: 1s;
}
.burbuja2:nth-child(5){
    left:35%;
    bottom:10%;
    width:27px;
    height:27px;    
    border-radius: 27px;
    animation-duration: 38s;
    animation-delay: 2s;
}
.burbuja2:nth-child(6){
    left:45%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 26s;
    animation-delay: 2s;
}
.burbuja2:nth-child(7){
    left:90%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 37s;
    animation-delay: 3s;
}
.burbuja2:nth-child(8){
    left:0%;
    bottom:10%;

    width:27px;
    height:27px;
    
    border-radius: 27px;

    animation-duration: 16s;
    animation-delay: 2s;
}

@keyframes bublesAnimation{
    0%{
        bottom:-10%;
    }
    40%{
        transform: translateX(-25px);  
    }
    50%{
        opacity: 0.1;
    }
    80%{
        transform: translateX(25px); 
    }
    100%{
        opacity: 0.01;
        bottom:100%;
    }
}

@keyframes bublesAnimation2{
    0%{
        bottom:-10%;
    }
    40%{
        transform: translateX(100px); 
    }
    50%{
        opacity: 0.1;
    }
    80%{
        transform: translateY(-25px);
    }
    100%{
        opacity: 0.01;
        
        bottom:100%;
    }
}



</style>