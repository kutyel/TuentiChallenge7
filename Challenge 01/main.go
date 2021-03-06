package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	t := 1
	r := 0.0
	index := 2

	data, err := ioutil.ReadFile("submitInput.txt")
	check(err)
	file, err := os.Create("submitOutput.txt")
	check(err)

	defer file.Close()

	lines := strings.Split(string(data), "\n")
	cases, err := strconv.Atoi(lines[0])
	check(err)

	for t <= cases && index < len(lines) {
		total := 0
		for _, s := range strings.Split(lines[index], " ") {
			n, err := strconv.Atoi(s)
			check(err)
			total += n
		}
		r = math.Trunc(float64(total) / float64(8))

		if total%8 != 0 {
			r++
		}

		result := fmt.Sprintf("Case #%d: %d\n", t, int(r))
		fmt.Print(result)
		file.WriteString(result)
		file.Sync()
		t++
		index += 2
	}
}
