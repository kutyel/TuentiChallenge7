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
	data, err := ioutil.ReadFile("submitInput.txt")
	check(err)
	file, err := os.Create("submitOutput.txt")
	check(err)

	defer file.Close()

	lines := strings.Split(string(data), "\n")

	for t := 1; t < len(lines)-1; t++ {
		num, err := strconv.ParseFloat(lines[t], 64)
		check(err)

		r := math.Ceil(math.Log2(num))
		result := fmt.Sprintf("Case #%d: %d\n", t, int(r))

		fmt.Print(result)
		file.WriteString(result)
		file.Sync()
	}
}
