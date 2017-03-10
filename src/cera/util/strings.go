package util

// HasString determines whether the provided slice of strings contains
// the given string.
func HasString(sl []string, s string) bool {
	for _, slS := range sl {
		if s == slS {
			return true
		}
	}
	return false
}

// HasAnyString determines whether the first provided slice of strings contains
// any of the members of the second slice of strings.
func HasAnyString(sl []string, cand []string) bool {
	for _, c := range cand {
		if HasString(sl, c) {
			return true
		}
	}
	return false

}
