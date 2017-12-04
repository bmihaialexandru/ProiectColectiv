<?php
/**
 * Created by PhpStorm.
 * User: Nicu
 * Date: 21-Nov-17
 * Time: 11:41 PM
 */


error_reporting(E_ERROR | E_PARSE);

require_once("../controllers/controller.php");
require_once("../services/JWTService.php");
include("./headers.php");

if($_SERVER["REQUEST_METHOD"] != "POST")
{
    $message->answer = "Error";
    echo json_encode($message);
}
else{
    $ctrl = new Controller();
    $tokenService = new JWTService();
    $id = $_POST["id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $token = $_POST["token"];
    $token_ok = true;
    $data = null;
    $saved_file_name = "";

    if($_FILES["photo"] != NULL)
    {
        $saved_file_name = pathinfo($_FILES["photo"]["tmp_name"])['filename'];
    }
    try
    {
        $data = $tokenService->validateToken($token);
        $user = $ctrl->uctrl->get_user_by_name($data['name']);
        if($user["user_type"] != $data["role"])
        {
            throw new Exception("Mismatch user role");
        }
        if($user["user_type"] != 1)
        {
            throw new Exception("User role not administrator!");
        }
    }
    catch(Exception $e)
    {
        $token_ok = false;
    }


    if($token_ok == false)
    {
        $message->answer = "Error";
        $message->reason = "Invalid token given";
        echo json_encode($message);
    }
    else
    {
        // edit these so we don't screw this shit
        $upload_ok = 1;
        $reason_failed = "";
        $target_dir = "";
        $imageFileType = "";

        if($_FILES["photo"] != NULL)
        {
            // process the image sent, if any
            $target_dir = "../uploads/";
            $target_file = $target_dir . basename($_FILES["photo"]["name"]);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                && $imageFileType != "svg") {
                $upload_ok = 0;
                $reason_failed = "Not a valid format! Only JPG/JPEG/PNG/SVG accepted!";
            }

            // 5 mb max file zile
            if ($_FILES["photo"]["size"] > 5000000) {
                $upload_ok = 0;
                $reason_failed = "File too large!";
            }
        }
        if($upload_ok == 0)
        {
            $message->answer = "Error";
            $message->reason = $reason_failed;
            echo json_encode($message);
        }
        else
        {

            if (empty($name) || empty($description))
            {
                $message->answer = "Error";
                $message->reason = "Name or description empty!";
                echo json_encode($message);
            }
            else
            {
                // if the user requested to edit the photo
                if($_FILES["photo"] != NULL)
                {
                    $target_file = $target_dir . $saved_file_name . "." . $imageFileType;

                    //delete the old photo, we don't need it anymore on the server side

                    $url_photo = $ctrl->cctrl->get_course($id)['url_photo'];
                    unlink($url_photo);

                    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
                        $message->answer = "Success";
                        $ctrl->cctrl->update_course($id, $name, $target_file, $description);
                        echo json_encode($message);
                    } else {
                        $message->answer = "Error";
                        $message->reason = "File transfer failed for some reason!";
                        echo json_encode($message);
                    }
                }
                else
                {
                    $url_photo = $ctrl->cctrl->get_course($id)['url_photo'];
                    $message->answer = "Success";
                    $ctrl->cctrl->update_course($id, $name, $url_photo, $description);
                    echo json_encode($message);
                }
            }
        }
    }

}


?>