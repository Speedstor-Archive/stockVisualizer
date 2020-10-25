<?php
    include "./header.php";
?>

<!-- bootstrap -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<script type="text/javascript" src="./js/shape.js"></script>
<script type="text/javascript" src="./js/visualizer.js"></script>
<style>
    #mainHeader h1{
        font-size: 32px !important;
    }
    @media only screen and (max-width: 700px) {
        h4{
            font-size: 14px;
        }
    }
</style>
<div id='loadDiv' style='width: 100%; height: calc(100vh - 58px); display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #666666, #2d4e33);'>
    <img src="./img/loader.gif" style="width: calc(100vw / 20);"/>
</div>
<div id='appWrap' style='display: none;'>
    <div id='keyOverlay' style='height: calc(100vh - 58px); width: 100vw; display: inline-block; position: absolute; bottom: 0px; left: 0px;'>
        <h4 style='position: absolute; top: 10px; left: 10px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Last Trade % (negative)</h4>
        <h4 style='position: absolute; top: 10px; left: calc(100vw/2 - 109px); background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Highest Exchange</h4>
        <h4 style='position: absolute; top: 10px; right: 30px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Last Trade $ (positive)</h4>
        <h4 style='position: absolute; top: calc(100vh/2 - 45px); right: 30px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Lowest Exchange</h4>
        <h4 style='position: absolute; bottom: 10px; right: 30px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Last Trade % (positive)</h4>
        <h4 style='position: absolute; bottom: 10px; left: calc(100vw/2 - 144px); background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Highest Exchange %</h4>
        <h4 style='position: absolute; bottom: 10px; left: 214px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Lowest Exchange %</h4>
        <h4 style='position: absolute; top: calc(100vh/2 - 45px); left: 10px; background:rgba(245, 245, 245, 0.6); padding: 4px 6px;'>Last Trade $ (negative)</h4>
    </div>
    <div style='background: url(./img/stockOverlay.jpg); opacity: 0.07; height: calc(100vh - 58px); width: 100vw; display: inline-block; position: absolute; bottom: 0px; left: 0px;'></div>
    <canvas id="visualizer" style="height: calc(100vh - 58px); width: 100%;"></canvas>
    <div class='card' id='selectBox' style='background: rgba(245, 245, 245, 0.6); display: inline-block; position: absolute; bottom: 10px; left: 10px;'>
        <div class='card-body' style="padding: 7px 1.25rem;">
            <div class="control-group" id='selectBox-inner' style="overflow:hidden;">

            </div>
            <button id='selectBox-toggle' class='btn btn-secondary btn-sm' onclick="closeOptions();">Close</button>
            <button id='dayNight-toggle' class='btn btn-secondary btn-sm' onclick="nightDayToggle();">Night</button>
        </div>
    </div>
</div>

<?php
    include "../blog/footer.php";
?>