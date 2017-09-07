package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func sum(input []int) int {
	sum := 0

	for i := range input {
		sum += input[i]
	}

	return sum
}

func main() {
	t := 1
	r := []int{}
	i := 2
	roll := 1
	frame := 1
	index := 0
	points := 0
	partial := 0

	data, err := ioutil.ReadFile("submitInput.txt")
	check(err)
	file, err := os.Create("submitOutput.txt")
	check(err)

	defer file.Close()

	lines := strings.Split(string(data), "\n")
	cases, err := strconv.Atoi(lines[0])
	check(err)

	for t <= cases && i < len(lines) {
		scores := []int{}

		for _, s := range strings.Split(lines[i], " ") {
			n, err := strconv.Atoi(s)
			check(err)
			scores = append(scores, n)
		}

		for frame < 10 && index < len(scores) {
			score := scores[index]
			// strike
			if score == 10 && roll == 1 {
				points += score + scores[index+1] + scores[index+2]
				r = append(r, points)
				frame++
			} else {
				points += score
				if roll == 1 {
					partial = score
				}
				if roll == 2 {
					// spare
					if partial+score == 10 {
						points += scores[index+1]
					}
					r = append(r, points)
					partial = 0
					roll = 1
					frame++
				} else {
					roll++
				}
			}
			index++
		}
		// frame 10
		r = append(r, points+sum(scores[index:]))

		result := fmt.Sprintf("Case #%d: %s\n", t, strings.Trim(strings.Join(strings.Fields(fmt.Sprint(r)), " "), "[]"))

		fmt.Print(result)
		file.WriteString(result)
		file.Sync()
		r = r[:0]
		points = 0
		index = 0
		frame = 1
		i += 2
		t++
	}
}
