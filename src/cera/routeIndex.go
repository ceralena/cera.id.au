package cera

import "github.com/ceralena/go-restroute"

func getIndex(req restroute.Request) (int, string) {
	return 200, `<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>cera</title>
</head>
<body>
    <div id='main'>
        <p>loading...</p>
    </div>

    <script src='/static/js/vendors.js' type='text/javascript'></script>
    <script src='/static/js/main.js' type='text/javascript'></script>
    <script type='text/javascript'>
        main.ceraMain();
    </script>
</body>
</html>`
}
