     <script type="text/javascript"src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"> </script>
	<script>
		/**
		 * Determine the mobile operating system.
		 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
		 *
		 * @returns {String}
		 */
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
			ExitApi.exit(clickTag);
		}

	</script>  