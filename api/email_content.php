<?php 
function orderConfirmEmailBody($userDetails , $orderDetails , $orderTotal ,$orderTime ){
 $userDetails = (array) $userDetails ;
 $orderDetails =  (array) $orderDetails;



$template = '
<html>
<head>

<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
<title>Dimo</title>

<style type="text/css">

      body{width: 100%; background-color: #E2E2E2; margin:0; padding:0; -webkit-font-smoothing: antialiased;mso-margin-top-alt:0px; mso-margin-bottom-alt:0px; mso-padding-alt: 0px 0px 0px 0px;}
        
        p,h1,h2,h3,h4{margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;}
        
        span.preheader{display: none; font-size: 1px;}
        
        html{width: 100%;}
        
        table{font-size: 12px;border: 0;}
    
    .menu-space{padding-right:25px;}


@media only screen and (max-width:640px)

{
  body{width:auto!important;}
  body[yahoo] .main {width:440px !important;}
  body[yahoo] .two-left{width:420px !important; margin:0px auto;}
  body[yahoo] .full{width:100% !important; margin:0px auto;}
  body[yahoo] .alaine{ text-align:center;}
  body[yahoo] .menu-space{padding-right:0px;}

  }

@media only screen and (max-width:479px)
{
  body{width:auto!important;}
  body[yahoo] .main {width:280px !important;}
  body[yahoo] .two-left{width:270px !important; margin:0px auto;}
  body[yahoo] .full{width:100% !important; margin:0px auto;}
  body[yahoo] .alaine{ text-align:center;}
  body[yahoo] .menu-space{padding-right:0px;}  
}


</style>

</head>

<body yahoo="fix" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<!--Main Table start-->

<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#fff" style="background:#fff;">
  <tr>
    <td align="center" valign="top">
    
      
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#000000" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td height="18" align="left" valign="top">&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top">
                
                
                <table width="180" border="0" align="left" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" valign="top"> </td>
                  </tr>
                  <tr>
    <td align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#454343;"></td>
  </tr>
                </table>
                              
                </td>
              </tr>

            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
    <!--Invoice date End-->
    
    
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#000000" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">

               
              <tr>
                <td align="center" valign="top" style="border-top:#edebeb solid 1px;">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
    <!--Invoice Billing start-->
    
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top">
                
                
                <table width="45%" border="0" align="left" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" valign="top"><img src="http://buildcorner.com/marwadi/main_site/images/logo1.png" width="175px" height="75px" </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top">&nbsp;</td>
                  </tr>
                </table>
                
                
                <table width="55%" border="0" align="right" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; color:#454343;">Shipping Address</td>
                  </tr>
                  <tr>
                    <td align="left" valign="top"><table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
                      <tr>
                        <td height="6" align="left" valign="top"> </td>
                      </tr>
                      <tr>
                        <td align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#4a4a4a; font-weight:normal; line-height:20px; padding-right:2px;">';

          $template .=   $userDetails['firstName'] . ' ' .$userDetails['lastName']. '<br />' .  $userDetails['address']. ', '.  $userDetails['city'] . ', '. $userDetails['state']. ', '. $userDetails['pincode'].
          
                        '<br /> </td>
                      </tr>
                    </table></td>
                  </tr>
                </table>
                
                
                </td>
              </tr>
               
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
       <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#000000" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">

              <tr>
                <td height="20" align="left" valign="top">&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top" style="border-top:#edebeb solid 1px;">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
    
    <!--Invoice summary start-->
    
     <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:normal; color:#1F72BE; text-transform:uppercase;">Order Summary</td>
              </tr>
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
     <!--Invoice summary End-->
    
    
     <!--Invoice title start-->
    
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">

              <tr>
                <td align="left" valign="top"><table width="90%" border="0" align="left" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#454343;">Description</td>
                    <td width="15%" align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#454343;">Box Price</td>
                    <td width="15%" align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#454343;">Qty</td>
                    <td width="20%" align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#454343;">Total</td>
                  </tr>
                  <tr>
                    <td height="12" colspan="4" align="left" valign="top" style="border-bottom:#e2e2e2 solid 1px;"> </td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
      <!--Invoice title End-->
    ';
  $products='';
   foreach ($orderDetails as $orderObj) {
    $order = (array)$orderObj;
    $itemTotal = ($order['_price']) * ($order['_quantity']); 
    $products .= 
          '     
     <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">

              <tr>
                <td align="left" valign="top"><table width="90%" border="0" align="left" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" align="left" valign="top"><table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#454343; line-height:20px;">'. $order['_name'];
if($order['_type']=='sample')
$products .= ' (Sample) ' ;
$products .= '</td>
                      </tr>
 
                    </table></td>

                    <td width="15%" align="left" valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#1F72BE;"> Rs.'.$order['_price'].'</td>
                    <td width="15%" align="left" valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#1F72BE;">'.$order['_quantity'].'</td>
                    <td width="20%" align="left" valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#1F72BE;"> Rs.'.$itemTotal.'</td>
                  </tr>
                  <tr>
                    <td height="12" colspan="4" align="left" valign="top" style="border-bottom:#e2e2e2 solid 1px;"> </td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>';
 
  }
  $template .= $products;
  $template .=    '     
             
    <!--Invoice total start-->
    
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top"><table width="100%" border="0" align="right" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" valign="top" style="border:#e2e2e2 solid 1px; border-top:none;"><table width="50%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="35%" height="50" align="center" valign="middle" style="border-right:#e2e2e2 solid 1px; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#454343; line-height:20px;">Total</td>
                        <td width="65%" align="left"  valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#454343; line-height:20px;padding-left:20px; border-right:none;"> Rs. '.$orderTotal.'</td>
                      </tr>
                      <tr>
                        <td width="35%" height="50" align="center" valign="middle" style="border:#e2e2e2 solid 1px; border-left:none; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#454343; line-height:20px;">Shipping</td>
                        <td width="65%" align="left"   valign="middle" style="border:#e2e2e2 solid 1px; border-right:none; border-right:none; font-family:Arial, Helvetica, sans-serif; padding-left:20px;font-size:16px; font-weight:bold; color:#454343; line-height:20px;  ">Rs. 0</td>
                      </tr>
                      <tr>
                        <td height="50" colspan="2" align="right" valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:30px; font-weight:bold; color:#454343; line-height:20px; padding-right:17px;"> Rs.'.$orderTotal.'</td>
                      </tr>
                    </table></td>
                  </tr>
                  </table></td>
              </tr>
              <tr>
                <td height="50" align="left" valign="top">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
    <!--Invoice total End-->
    
    
    <!--Copyright start-->

    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >
          <tr>
            <td align="left" valign="top" bgcolor="#e76046" style="background:#1F72BE; -moz-border-radius: 0px 0px 15px 15px; border-radius: 0px 0px 15px 15px;"><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td height="20" align="left" valign="top">&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                   <tr>
                    <td align="center" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#FFF; font-weight:normal;">Copyright 2015 &copy; Buildcorner.com. All rights reserved</td>
                  </tr>
                  <tr>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td align="left" valign="top">&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    
    <!--Copyright End-->
    
    </td>
  </tr>
</table>

<!--Main Table End-->

</body>
</html>';
 
return $template;
}
?>