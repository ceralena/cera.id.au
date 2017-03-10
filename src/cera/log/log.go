package log

import (
	"fmt"
	"os"
)

// F will format and log a message.
func F(msg string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, msg, args...)
	if len(msg) == 0 || msg[len(msg)-1] != '\n' {
		fmt.Fprintf(os.Stderr, "\n")
	}
}
