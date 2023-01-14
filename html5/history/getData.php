<?php
	include 'config.php';
	$msg="";
	$errdate=$errswipe="";
	
	print_r($_POST);
	//validation functions 
	function timevalidation(){
		if($_POST['swipeout']>$_POST['swipein']){
			return true;
		}
		else{
			return false;
		}
	}
	//function to validate whether data for same date is present
	function isValidDate($conn,$date){
		$query = $conn->prepare("SELECT count(*) as count FROM timedata where date = '" . $date . "' and emp_id = '".$_SESSION['usr']."'");
		$query->execute();
		$row = $query->fetch();
		if ($row['count'] == 0) {
			return true;
		} else {
			return false;
		}
	
	}
	
	if(!empty($_POST) && timevalidation()==true && isValidDateRange()==true && isValidDate($conn,$_POST['date'])==true ){
		

		$stmt = $conn->prepare("INSERT INTO timedata (swipein,swipeout,date,emp_id) VALUES (:swipein, :swipeout, :date,:emp_id)");
		$stmt->bindParam(':date', $_POST['date']);
		$stmt->bindParam(':swipein', $_POST['swipein']);
		$stmt->bindParam(':swipeout', $_POST['swipeout']);
		$stmt->bindParam(':emp_id', $_SESSION['usr']);
		$stmt->execute();
		/* if($stmt->rowCount()>0){
			echo "inserted";
		} */
		echo "data inserted";
	}
	else{
		echo "Error";
	}

	function isValidDateRange(){
		//date should not be earlier last Sunday's date
		$sundaydate=date('m/d/y',strtotime("last Sunday"));
		$todaydate=date('m/d/y',strtotime("now"));
		echo  date('h:i:s',strtotime("now"));
		//echo $todaydate;
		if(strtotime($sundaydate)<=strtotime($_POST['date'])&& strtotime($_POST['date'])<strtotime($todaydate)){
			return true;
		}
		else{
			return false;
		}
	}
	
?>