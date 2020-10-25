<?php
     session_start();

     $file = $_SERVER['PHP_SELF'];
     //require "../includes/traffic.inc.php";
?>



<!DOCTYPE html>
<html lang="en">
<head>
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Speedstor - Freelance Artist & Programmer</title>
     <meta name="viewport" content="height=device-height, initial-scale=1">
     <meta name="description" content="Speedstor is a brand by a high schooler, and is established for the aim of helping others. Although as a high schooler myself, speedstor could do the best I can to provide you with the best services. The skills that I provide include coding and art. Specifically, c++, java, javascript, illustration, photoshop, adobe priemer, adobe after effects, and blender. Speedstor is the one-stop place to satisfy all your needs, whatever your project speedstor could do it all. Feel free to contact speedtor through this website. My name is Yan Shing Cheung, but I am called Aldrin Cheung. This could see as a profile for Aldrin. Aldrin is the highschooler.">
	<link rel="stylesheet" type="text/css" href="../css/header.css?v=3">
	<link rel="stylesheet" type="text/css" href="../css/footer.css">
	<link rel="stylesheet" type="text/css" href="css/index.css">
     <script type="text/javascript" src="../js/jquery-3.3.1.min.js"></script>
     <script type="text/javascript" src="../js/javascript.js"></script>
     <script>
          function closeMenu(){
	document.getElementById("message10").style.display = "none";
	console.log("hi");
}
     </script>
     <style>
.menuItem{
	float:left;
	border-color:#515151;
	background: transparent;
	height:58px;
	padding:17px;
	list-style:none;
	margin: 0px;
	color:#eaeaea;
	font-size:16px;
	font-family:Arial;

	transition:all 30ms linear;
}
     </style>
</head>
<body style="margin:0;">
     <header id="mainHeader" style="position:relative; z-index: 10;">
          <a href="../index.php"><h1>Speedstor <span style="font-size: 15px;">(stock visualizer)</span></h1></a>
          <nav id="navBar">
               <a href="../index.php"><button class="menuItem">Home</button></a>
               <div class="dropdown pricesDropdown"><a href="../prices.php"><button class="menuItem">Prices</button></a>
                    <div class="dropdown-context prices-context">
                         <a class="listItem" href="../services.php">Examples</a>
                         <a class="listItem" href="../tempGame/game.html">Simple Javascript Game</a>
                    </div>
               </div>
               <div class="dropdown productsDropdown"><a href="../products.php"><button class="menuItem">Products</button></a>
                    <div class="dropdown-context products-context">
                         <a class="listItem" href="../mbp.php">Fairmont My Backpack</a>
                         <a class="listItem" href="../products/pokemon-ripoff.php">Pokemon Ripoff</a>
                         <a class="listItem" href="../products/keyboard-game.php">Keyboard Game</a>
                         <a class="listItem" href="../products/website-analytics-report.php">Website Analytics Report</a>
                         <a class="listItem" href="../products/flappy-bird-in-java.php">Flappy Bird in Java</a>
                         <a class="listItem" href="../products/triginator.php">Triginator</a>
                         <a class="listItem" href="../products/youtube-reader.php">Youtube Reader</a>
                    </div>
               </div>
               <a href="../about.php"><button class="menuItem">About</button></a>
               <a href="https://blog.speedstor.net"><button class="menuItem">Blog</button></a>
          </nav>

          <div id="menuButton" onclick="toggleSidebar()">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
     
               <div id="sideBar">
                    <a href="#" class="getStartedMenu">Get Started</a>
                    <li class="sideBarTop" onclick="toggleSidebar()">X</li>
					
                    <ul>
                         <li class="sideMenu"><a href="../index.php"><p class="menuLink">Home</p></a></li>
                         <li class="sideMenu"><a href="../services.php"><p class="menuLink">Examples</p></a></li>
                         <li class="sideMenu"><a href="../prices.php"><p class="menuLink">Prices</p></a></li>
                         <li class="sideMenu"><a href="../about.php"><p class="menuLink">About</p></a></li>
                         <li class="sideMenu"><a href="../products.php"><p class="menuLink">Products</p></a></li>
                         <li class="sideMenu"><a href="../tempGame/game.html"><p class="menuLink">Canvas</p></a></li>
                         <?php
                              if(!isset($_SESSION['userId'])){
                              echo'
                                   <li class="sideMenu"><a href="../login.php"><p class="menuLink">Log In</p></a></li>
                              ';
                              }else{
                              echo'
                                   <li class="sideMenu"><form action="../includes/logout.inc.php" method="post">
                                        <button type="submit" class="sideMenuLogout"> Logout </button>
                                   </form></li>
                              ';
                              }
                         ?>
                    </ul>
               </div>
          </div>  
          
     </header>