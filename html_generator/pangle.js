<script src="https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js"></script> 
	<script>
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";
		}
	var clickTag = "https://play.google.com/store/apps/details?id=com.dop4.love.puzzle&hl=en&gl=US";
	if (getMobileOS()=="iOS"){
		clickTag = "https://apps.apple.com/us/app/dop-fun-delete-one-part/id6475806932?l=vi";
   		}
   		window.failedIndex = 0; 

		window.openStore = function() {
			  window.openAppStore();
		}

	</script>  