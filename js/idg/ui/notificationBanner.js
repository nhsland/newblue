/**
Notification banner (User / Admin)
**/
idg.notificationBanner = function(){
	if( $('#oe-admin-notifcation').length == 0 ) return;
	
	// icon toggles Short/ Full Message
	$('#oe-admin-notifcation .oe-i').click( toggleNotification);
	
	function toggleNotification(){
		$('#notification-short').toggle();
		$('#notification-full').toggle();
	}
}