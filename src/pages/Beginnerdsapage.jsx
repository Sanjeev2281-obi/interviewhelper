import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ExternalLink, ArrowLeft, Play, BookOpen, CheckCircle, Lightbulb } from 'lucide-react'

// ── Tamil YouTube channels (verified DSA in Tamil) ────────────
const TAMIL_CHANNELS = [
  { name: 'Geekific Tamil',      url: 'https://www.youtube.com/@GeekificTamil',          topic: 'All topics' },
  { name: 'Tamil Coding',        url: 'https://www.youtube.com/@tamilcoding',             topic: 'Arrays & Strings' },
  { name: 'CS Tamizha',          url: 'https://www.youtube.com/@CSTamizha',               topic: 'DSA in Tamil' },
  { name: 'Code with Tamizha',   url: 'https://www.youtube.com/@codewithtamizha',         topic: 'Problem solving' },
]

// ── All beginner problems by topic ───────────────────────────
const TOPICS = [
  {
    id: 'arrays',
    title: 'Arrays',
    icon: '[ ]',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    description: 'Arrays store multiple values in a single variable. Every coding interview starts here.',
    conceptNote: 'An array is like a row of boxes — each box has an index starting from 0. You access any box in O(1) time.',
    youtubeSearch: 'https://www.youtube.com/results?search_query=arrays+in+tamil+dsa',
    problems: [
      {
        id: 1, title: 'Find the largest number in an array', difficulty: 'easy',
        description: 'Given an array of numbers, find and return the maximum value.',
        input: 'arr = [3, 7, 1, 9, 4]',
        output: '9',
        explanation: 'Start with arr[0] as max. Loop through each element — if current element > max, update max. At the end, max holds the largest number.',
        pseudocode: 'max = arr[0]\nfor each num in arr:\n    if num > max:\n        max = num\nreturn max',
        leetcode: 'https://leetcode.com/problems/find-the-highest-altitude/',
        gfg: 'https://www.geeksforgeeks.org/c-program-find-largest-element-array/',
        tamil: 'https://www.youtube.com/results?search_query=find+maximum+element+array+tamil',
      },
      {
        id: 2, title: 'Reverse an array', difficulty: 'easy',
        description: 'Given an array, return a new array with elements in reversed order.',
        input: 'arr = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'Use two pointers — one at the start (left) and one at the end (right). Swap them and move both pointers towards the center. Stop when left >= right.',
        pseudocode: 'left = 0, right = n-1\nwhile left < right:\n    swap(arr[left], arr[right])\n    left++, right--',
        leetcode: 'https://leetcode.com/problems/reverse-string/',
        gfg: 'https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/',
        tamil: 'https://www.youtube.com/results?search_query=reverse+array+tamil+dsa',
      },
      {
        id: 3, title: 'Check if array contains a duplicate', difficulty: 'easy',
        description: 'Given an array of integers, return true if any value appears at least twice.',
        input: 'arr = [1, 2, 3, 1]',
        output: 'true',
        explanation: 'Use a HashSet. For each element, check if it already exists in the set. If yes → duplicate found. If no → add it to the set.',
        pseudocode: 'set = {}\nfor each num in arr:\n    if num in set: return true\n    set.add(num)\nreturn false',
        leetcode: 'https://leetcode.com/problems/contains-duplicate/',
        gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/',
        tamil: 'https://www.youtube.com/results?search_query=contains+duplicate+leetcode+tamil',
      },
      {
        id: 4, title: 'Move all zeros to the end', difficulty: 'easy',
        description: 'Given an array, move all 0s to the end while maintaining order of non-zero elements.',
        input: 'arr = [0, 1, 0, 3, 12]',
        output: '[1, 3, 12, 0, 0]',
        explanation: 'Use a pointer (pos) that tracks where to place the next non-zero element. Loop through — whenever you see a non-zero, place it at arr[pos] and increment pos. Fill rest with zeros.',
        pseudocode: 'pos = 0\nfor i in range(n):\n    if arr[i] != 0:\n        arr[pos] = arr[i]\n        pos++\nfill arr[pos..n-1] with 0',
        leetcode: 'https://leetcode.com/problems/move-zeroes/',
        gfg: 'https://www.geeksforgeeks.org/move-zeroes-end-array/',
        tamil: 'https://www.youtube.com/results?search_query=move+zeroes+leetcode+tamil',
      },
      {
        id: 5, title: 'Find missing number (1 to N)', difficulty: 'easy',
        description: 'Given an array containing n distinct numbers from 0 to n, find the missing number.',
        input: 'arr = [3, 0, 1]  (n=3)',
        output: '2',
        explanation: 'Expected sum of 1 to n = n*(n+1)/2. Actual sum = sum of all elements. Missing number = expected sum - actual sum.',
        pseudocode: 'expected = n*(n+1)/2\nactual = sum(arr)\nreturn expected - actual',
        leetcode: 'https://leetcode.com/problems/missing-number/',
        gfg: 'https://www.geeksforgeeks.org/find-the-missing-number/',
        tamil: 'https://www.youtube.com/results?search_query=missing+number+leetcode+tamil',
      },
      {
  id: 6,
  title: 'Check if array is sorted',
  difficulty: 'easy',
  description: 'Given an array, check if it is sorted in non-decreasing order.',
  input: 'arr = [1, 2, 3, 4, 5]',
  output: 'true',
  explanation: 'Traverse the array and compare each element with the previous one. If any element is smaller than the previous, the array is not sorted.',
  pseudocode: 'for i from 1 to n-1:\n    if arr[i] < arr[i-1]:\n        return false\nreturn true',
  leetcode: 'https://leetcode.com/problems/monotonic-array/',
  gfg: 'https://www.geeksforgeeks.org/check-if-an-array-is-sorted/',
  tamil: 'https://www.youtube.com/results?search_query=check+array+sorted+tamil',
},
{
  id: 7,
  title: 'Linear Search',
  difficulty: 'easy',
  description: 'Search for a target element in an array and return its index.',
  input: 'arr = [4, 2, 7, 1], target = 7',
  output: '2',
  explanation: 'Traverse the array from start to end. If the element matches the target, return its index.',
  pseudocode: 'for i from 0 to n-1:\n    if arr[i] == target:\n        return i\nreturn -1',
  leetcode: 'https://leetcode.com/problems/search-insert-position/',
  gfg: 'https://www.geeksforgeeks.org/linear-search/',
  tamil: 'https://www.youtube.com/results?search_query=linear+search+tamil',
},
{
  id: 8,
  title: 'Find second largest element',
  difficulty: 'easy',
  description: 'Find the second largest element in the array.',
  input: 'arr = [10, 20, 4, 45, 99]',
  output: '45',
  explanation: 'Track two variables: largest and secondLargest. Update them while traversing.',
  pseudocode: 'largest = -∞, second = -∞\nfor num in arr:\n    if num > largest:\n        second = largest\n        largest = num\n    else if num > second and num != largest:\n        second = num\nreturn second',
  leetcode: 'https://leetcode.com/problems/third-maximum-number/',
  gfg: 'https://www.geeksforgeeks.org/find-second-largest-element-array/',
  tamil: 'https://www.youtube.com/results?search_query=second+largest+element+tamil',
},
{
  id: 9,
  title: 'Count even numbers',
  difficulty: 'easy',
  description: 'Count how many even numbers are present in the array.',
  input: 'arr = [1, 2, 3, 4, 6]',
  output: '3',
  explanation: 'Traverse the array and increment count whenever element % 2 == 0.',
  pseudocode: 'count = 0\nfor num in arr:\n    if num % 2 == 0:\n        count++\nreturn count',
  leetcode: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/',
  gfg: 'https://www.geeksforgeeks.org/count-even-and-odd-elements-in-an-array/',
  tamil: 'https://www.youtube.com/results?search_query=count+even+numbers+array+tamil',
},
{
  id: 10,
  title: 'Sum of array elements',
  difficulty: 'easy',
  description: 'Find the sum of all elements in an array.',
  input: 'arr = [1, 2, 3, 4]',
  output: '10',
  explanation: 'Initialize sum = 0 and add each element while traversing.',
  pseudocode: 'sum = 0\nfor num in arr:\n    sum += num\nreturn sum',
  leetcode: 'https://leetcode.com/problems/running-sum-of-1d-array/',
  gfg: 'https://www.geeksforgeeks.org/sum-of-array-elements/',
  tamil: 'https://www.youtube.com/results?search_query=sum+of+array+tamil',
},
{
  id: 11,
  title: 'Find minimum element',
  difficulty: 'easy',
  description: 'Find the smallest element in the array.',
  input: 'arr = [5, 2, 8, 1, 3]',
  output: '1',
  explanation: 'Initialize min = arr[0]. Traverse and update if smaller value is found.',
  pseudocode: 'min = arr[0]\nfor num in arr:\n    if num < min:\n        min = num\nreturn min',
  leetcode: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
  gfg: 'https://www.geeksforgeeks.org/find-minimum-element-in-an-array/',
  tamil: 'https://www.youtube.com/results?search_query=find+minimum+element+array+tamil',
},
{
  id: 12,
  title: 'Check if element exists',
  difficulty: 'easy',
  description: 'Check whether a given element exists in the array.',
  input: 'arr = [1, 3, 5, 7], target = 5',
  output: 'true',
  explanation: 'Traverse array and compare each element with target.',
  pseudocode: 'for num in arr:\n    if num == target:\n        return true\nreturn false',
  leetcode: 'https://leetcode.com/problems/check-if-n-and-its-double-exist/',
  gfg: 'https://www.geeksforgeeks.org/find-whether-an-array-contains-a-specific-element/',
  tamil: 'https://www.youtube.com/results?search_query=element+exists+array+tamil',
}
    ],
  },
  {
    id: 'strings',
    title: 'Strings',
    icon: '"A"',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.25)',
    description: 'Strings are arrays of characters. String manipulation is asked in almost every interview.',
    conceptNote: 'A string is just an array of characters. "hello" → [\'h\',\'e\',\'l\',\'l\',\'o\']. Most string problems can be solved by treating them as character arrays.',
    youtubeSearch: 'https://www.youtube.com/results?search_query=strings+dsa+tamil',
    problems: [
      {
        id: 6, title: 'Reverse a string', difficulty: 'easy',
        description: 'Given a string, return the reversed version of it.',
        input: 's = "hello"',
        output: '"olleh"',
        explanation: 'Convert string to char array. Use two pointers (left, right). Swap characters and move pointers inward until they meet.',
        pseudocode: 'chars = s.toCharArray()\nleft=0, right=len-1\nwhile left < right:\n    swap(chars[left], chars[right])\n    left++, right--\nreturn new String(chars)',
        leetcode: 'https://leetcode.com/problems/reverse-string/',
        gfg: 'https://www.geeksforgeeks.org/reverse-a-string-in-java/',
        tamil: 'https://www.youtube.com/results?search_query=reverse+string+tamil+dsa',
      },
      {
        id: 7, title: 'Check if a string is a palindrome', difficulty: 'easy',
        description: 'A palindrome reads the same forwards and backwards. Check if given string is one.',
        input: 's = "racecar"',
        output: 'true',
        explanation: 'Use two pointers — one at start, one at end. If characters at both pointers match, move them inward. If they mismatch at any point, return false. If loop completes, return true.',
        pseudocode: 'left=0, right=len-1\nwhile left < right:\n    if s[left] != s[right]: return false\n    left++, right--\nreturn true',
        leetcode: 'https://leetcode.com/problems/valid-palindrome/',
        gfg: 'https://www.geeksforgeeks.org/c-program-check-given-string-palindrome/',
        tamil: 'https://www.youtube.com/results?search_query=palindrome+string+tamil+dsa',
      },
      {
        id: 8, title: 'Count vowels and consonants', difficulty: 'easy',
        description: 'Given a string, count the number of vowels and consonants in it.',
        input: 's = "Hello World"',
        output: 'Vowels: 3, Consonants: 7',
        explanation: 'Loop through each character. Skip spaces. Check if character is in "aeiouAEIOU" → vowel count++. Otherwise → consonant count++.',
        pseudocode: 'vowels = 0, consonants = 0\nfor each char c in s:\n    if c == space: skip\n    if c in "aeiouAEIOU": vowels++\n    else: consonants++',
        leetcode: 'https://leetcode.com/problems/count-vowel-substrings-of-a-string/',
        gfg: 'https://www.geeksforgeeks.org/program-count-vowels-consonants-special-characters-string/',
        tamil: 'https://www.youtube.com/results?search_query=count+vowels+consonants+tamil+java',
      },
      {
        id: 9, title: 'Check if two strings are anagrams', difficulty: 'easy',
        description: 'Two strings are anagrams if they contain the same characters in any order.',
        input: 's1 = "listen", s2 = "silent"',
        output: 'true',
        explanation: 'Sort both strings. If sorted versions are equal → they are anagrams. OR use a frequency map: count characters in s1, subtract for s2, all counts should be 0.',
        pseudocode: 'if len(s1) != len(s2): return false\nreturn sort(s1) == sort(s2)',
        leetcode: 'https://leetcode.com/problems/valid-anagram/',
        gfg: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/',
        tamil: 'https://www.youtube.com/results?search_query=anagram+tamil+dsa+leetcode',
      },
      {
        id: 10, title: 'Find the first non-repeating character', difficulty: 'easy',
        description: 'Given a string, find the first character that appears only once.',
        input: 's = "leetcode"',
        output: '"l"',
        explanation: 'First pass: count frequency of each character using a HashMap. Second pass: loop through string again — first character with frequency 1 is the answer.',
        pseudocode: 'map = {}\nfor c in s: map[c]++\nfor c in s:\n    if map[c] == 1: return c\nreturn -1',
        leetcode: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
        gfg: 'https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/',
        tamil: 'https://www.youtube.com/results?search_query=first+non+repeating+character+tamil',
      },
    ],
  },
  {
    id: 'twopointers',
    title: 'Two Pointers',
    icon: '← →',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    border: 'rgba(52,211,153,0.25)',
    description: 'Two pointers is a technique where you use two variables to scan through an array from different ends.',
    conceptNote: 'Instead of using nested loops (O(n²)), two pointers solve many problems in O(n). One pointer starts at left, one at right — they move toward each other based on conditions.',
    youtubeSearch: 'https://www.youtube.com/results?search_query=two+pointers+technique+tamil+dsa',
    problems: [
      {
        id: 11, title: 'Two Sum (sorted array)', difficulty: 'easy',
        description: 'Given a sorted array and a target, find two numbers that add up to the target.',
        input: 'arr = [2, 7, 11, 15], target = 9',
        output: '[0, 1]  (arr[0] + arr[1] = 2+7 = 9)',
        explanation: 'Left pointer starts at index 0, right pointer at last index. If arr[left]+arr[right] == target → found! If sum < target → move left right. If sum > target → move right left.',
        pseudocode: 'left=0, right=n-1\nwhile left < right:\n    sum = arr[left] + arr[right]\n    if sum == target: return [left,right]\n    if sum < target: left++\n    else: right--',
        leetcode: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        gfg: 'https://www.geeksforgeeks.org/two-sum-using-two-pointers/',
        tamil: 'https://www.youtube.com/results?search_query=two+sum+two+pointers+tamil',
      },
      {
        id: 12, title: 'Remove duplicates from sorted array', difficulty: 'easy',
        description: 'Remove duplicates in-place from a sorted array, return the count of unique elements.',
        input: 'arr = [1, 1, 2, 2, 3]',
        output: '3  (array becomes [1, 2, 3, ...])',
        explanation: 'Keep a slow pointer (i=0). Loop with fast pointer (j=1). If arr[j] != arr[i] → it is a new unique element → move i forward and copy arr[j] to arr[i]. Return i+1.',
        pseudocode: 'i = 0\nfor j from 1 to n-1:\n    if arr[j] != arr[i]:\n        i++\n        arr[i] = arr[j]\nreturn i+1',
        leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
        gfg: 'https://www.geeksforgeeks.org/remove-duplicates-sorted-array/',
        tamil: 'https://www.youtube.com/results?search_query=remove+duplicates+sorted+array+tamil',
      },
      {
        id: 13, title: 'Check if string has valid palindrome (ignore spaces)', difficulty: 'easy',
        description: 'Given a string with letters/digits/spaces, check if it is a palindrome ignoring non-alphanumeric chars.',
        input: 's = "A man a plan a canal Panama"',
        output: 'true',
        explanation: 'Two pointers — left and right. Skip non-alphanumeric characters. Compare lowercase versions of chars at both pointers. If mismatch → false.',
        pseudocode: 'left=0, right=len-1\nwhile left < right:\n    skip non-alphanumeric on both sides\n    if lowercase(s[left]) != lowercase(s[right]):\n        return false\n    left++, right--\nreturn true',
        leetcode: 'https://leetcode.com/problems/valid-palindrome/',
        gfg: 'https://www.geeksforgeeks.org/c-program-check-given-string-palindrome/',
        tamil: 'https://www.youtube.com/results?search_query=valid+palindrome+leetcode+tamil',
      },
      {
        id: 14, title: 'Merge two sorted arrays', difficulty: 'easy',
        description: 'Given two sorted arrays, merge them into one sorted array.',
        input: 'a = [1, 3, 5], b = [2, 4, 6]',
        output: '[1, 2, 3, 4, 5, 6]',
        explanation: 'Use two pointers i and j starting at 0 for each array. Compare a[i] and b[j] — add smaller one to result and advance that pointer. When one array is exhausted, copy remaining elements of other.',
        pseudocode: 'i=0, j=0, result=[]\nwhile i<len(a) and j<len(b):\n    if a[i] < b[j]: result.add(a[i++])\n    else: result.add(b[j++])\nadd remaining elements\nreturn result',
        leetcode: 'https://leetcode.com/problems/merge-sorted-array/',
        gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/',
        tamil: 'https://www.youtube.com/results?search_query=merge+sorted+arrays+tamil+dsa',
      },
      {
        id: 15, title: 'Container with most water', difficulty: 'medium',
        description: 'Given heights of vertical lines, find two lines that form a container holding the most water.',
        input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        output: '49',
        explanation: 'Left pointer at start, right at end. Area = min(height[left], height[right]) × (right-left). Move pointer with smaller height inward — because moving the taller one can only decrease width without possibility of increasing height.',
        pseudocode: 'left=0, right=n-1, maxArea=0\nwhile left < right:\n    area = min(h[left],h[right]) * (right-left)\n    maxArea = max(maxArea, area)\n    if h[left] < h[right]: left++\n    else: right--\nreturn maxArea',
        leetcode: 'https://leetcode.com/problems/container-with-most-water/',
        gfg: 'https://www.geeksforgeeks.org/container-with-most-water/',
        tamil: 'https://www.youtube.com/results?search_query=container+with+most+water+tamil',
      },
    ],
  },
  {
    id: 'slidingwindow',
    title: 'Sliding Window',
    icon: '[→]',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.12)',
    border: 'rgba(251,191,36,0.25)',
    description: 'Sliding window finds the optimal subarray or substring by maintaining a window that expands and shrinks.',
    conceptNote: 'Think of a window of size k sliding over the array. Instead of recalculating sum from scratch each time (O(n²)), you add the new element and remove the old one — making it O(n).',
    youtubeSearch: 'https://www.youtube.com/results?search_query=sliding+window+technique+tamil+dsa',
    problems: [
      {
        id: 16, title: 'Maximum sum subarray of size K', difficulty: 'easy',
        description: 'Given an array and a number K, find the maximum sum of any subarray of size K.',
        input: 'arr = [2, 1, 5, 1, 3, 2], k = 3',
        output: '9  (subarray [5,1,3])',
        explanation: 'Compute sum of first window (first k elements). Slide the window — add the incoming element (arr[i]) and subtract the outgoing element (arr[i-k]). Track maximum sum.',
        pseudocode: 'windowSum = sum(arr[0..k-1])\nmaxSum = windowSum\nfor i from k to n-1:\n    windowSum += arr[i] - arr[i-k]\n    maxSum = max(maxSum, windowSum)\nreturn maxSum',
        leetcode: 'https://leetcode.com/problems/maximum-average-subarray-i/',
        gfg: 'https://www.geeksforgeeks.org/window-sliding-technique/',
        tamil: 'https://www.youtube.com/results?search_query=sliding+window+maximum+sum+tamil',
      },
      {
        id: 17, title: 'Longest substring without repeating characters', difficulty: 'medium',
        description: 'Find the length of the longest substring that has no repeating characters.',
        input: 's = "abcabcbb"',
        output: '3  (substring "abc")',
        explanation: 'Use a HashSet as your window. Expand right pointer adding characters. If a character already exists in set → shrink from left until duplicate is removed. Track max window size throughout.',
        pseudocode: 'set={}, left=0, maxLen=0\nfor right from 0 to n-1:\n    while s[right] in set:\n        set.remove(s[left])\n        left++\n    set.add(s[right])\n    maxLen = max(maxLen, right-left+1)\nreturn maxLen',
        leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        gfg: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/',
        tamil: 'https://www.youtube.com/results?search_query=longest+substring+without+repeating+tamil',
      },
      {
        id: 18, title: 'Count occurrences of anagrams', difficulty: 'medium',
        description: 'Given a text and a pattern, count how many times anagrams of the pattern appear in the text.',
        input: 'text = "forxxorfxdofr", pattern = "for"',
        output: '4',
        explanation: 'Use a fixed window of size = pattern length. Use frequency maps. If frequency map of current window matches pattern frequency map → it is an anagram. Slide window by adding new char and removing old char.',
        pseudocode: 'pFreq = frequency map of pattern\nwFreq = frequency map of first window\ncount = (pFreq==wFreq ? 1 : 0)\nfor i from len(p) to len(t)-1:\n    add t[i] to wFreq\n    remove t[i-len(p)] from wFreq\n    if wFreq == pFreq: count++\nreturn count',
        leetcode: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
        gfg: 'https://www.geeksforgeeks.org/count-occurrences-of-anagrams/',
        tamil: 'https://www.youtube.com/results?search_query=anagram+occurrences+sliding+window+tamil',
      },
    ],
  },
  {
    id: 'basicmath',
    title: 'Basic Math & Logic',
    icon: '123',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.12)',
    border: 'rgba(248,113,113,0.25)',
    description: 'Number-based problems that test basic mathematical thinking — common in Zoho, TCS, Infosys first rounds.',
    conceptNote: 'These problems require no fancy data structures — just clear thinking. Useful for service-based company rounds and warm-up before harder problems.',
    youtubeSearch: 'https://www.youtube.com/results?search_query=basic+math+problems+dsa+tamil',
    problems: [
      {
        id: 19, title: 'Check if a number is prime', difficulty: 'easy',
        description: 'Given a number n, return true if it is a prime number.',
        input: 'n = 17',
        output: 'true',
        explanation: 'A prime number is divisible only by 1 and itself. Loop from 2 to √n — if any number divides n evenly → not prime. Checking only up to √n is the key optimization.',
        pseudocode: 'if n <= 1: return false\nfor i from 2 to sqrt(n):\n    if n % i == 0: return false\nreturn true',
        leetcode: 'https://leetcode.com/problems/count-primes/',
        gfg: 'https://www.geeksforgeeks.org/prime-numbers/',
        tamil: 'https://www.youtube.com/results?search_query=prime+number+program+tamil+java',
      },
      {
        id: 20, title: 'Fibonacci number', difficulty: 'easy',
        description: 'Return the nth Fibonacci number. Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...',
        input: 'n = 6',
        output: '8',
        explanation: 'Each Fibonacci number = sum of previous two. Iterative approach: keep track of last two numbers (a, b). In each step, update: a=b, b=a+b. Repeat n times.',
        pseudocode: 'if n <= 1: return n\na=0, b=1\nfor i from 2 to n:\n    c = a + b\n    a = b\n    b = c\nreturn b',
        leetcode: 'https://leetcode.com/problems/fibonacci-number/',
        gfg: 'https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/',
        tamil: 'https://www.youtube.com/results?search_query=fibonacci+number+tamil+java+program',
      },
      {
        id: 21, title: 'Palindrome number', difficulty: 'easy',
        description: 'Given an integer, check if it reads the same forwards and backwards.',
        input: 'n = 121',
        output: 'true',
        explanation: 'Reverse the number by extracting digits (% 10 to get last digit, divide by 10 to remove it). If reversed number == original → palindrome. Negative numbers are never palindromes.',
        pseudocode: 'if n < 0: return false\noriginal = n, reversed = 0\nwhile n > 0:\n    reversed = reversed*10 + n%10\n    n = n/10\nreturn original == reversed',
        leetcode: 'https://leetcode.com/problems/palindrome-number/',
        gfg: 'https://www.geeksforgeeks.org/check-if-a-number-is-palindrome/',
        tamil: 'https://www.youtube.com/results?search_query=palindrome+number+tamil+java',
      },
      {
        id: 22, title: 'Count digits in a number', difficulty: 'easy',
        description: 'Given a number n, count how many digits it has.',
        input: 'n = 12345',
        output: '5',
        explanation: 'Keep dividing n by 10 until it becomes 0. Count how many times you divided. Alternatively, convert to string and return its length.',
        pseudocode: 'count = 0\nwhile n > 0:\n    n = n / 10\n    count++\nreturn count',
        leetcode: 'https://leetcode.com/problems/number-of-digits-in-the-factorial-of-a-number/',
        gfg: 'https://www.geeksforgeeks.org/program-count-digits-integer-3-different-methods/',
        tamil: 'https://www.youtube.com/results?search_query=count+digits+number+tamil+java',
      },
    ],
  },
]

const diffColors = {
  easy:   { bg: 'rgba(34,197,94,0.12)',  text: '#4ade80',  border: 'rgba(34,197,94,0.25)'  },
  medium: { bg: 'rgba(251,191,36,0.12)', text: '#fbbf24',  border: 'rgba(251,191,36,0.25)' },
  hard:   { bg: 'rgba(248,113,113,0.12)',text: '#f87171',  border: 'rgba(248,113,113,0.25)'},
}

// ── Single problem card ───────────────────────────────────────
function ProblemCard({ p }) {
  const [open, setOpen] = useState(false)
  const dc = diffColors[p.difficulty]

  return (
    <div style={{
      background: '#111827', border: open ? '1px solid rgba(34,197,94,0.3)' : '1px solid #1f2937',
      borderRadius: 14, marginBottom: 10, overflow: 'hidden', transition: 'border-color .2s',
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', background: open ? 'rgba(34,197,94,0.03)' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{
          width: 26, height: 26, borderRadius: 6, background: dc.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: dc.text }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{p.title}</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{p.description}</div>
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`, flexShrink: 0,
        }}>{p.difficulty}</span>
        <div style={{ color: '#4b5563', flexShrink: 0 }}>
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid #1f2937' }}>

          {/* Input / Output */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '14px 0' }}>
            <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Input</div>
              <div style={{ fontSize: 12, color: '#4ade80', fontFamily: 'monospace', lineHeight: 1.6 }}>{p.input}</div>
            </div>
            <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Output</div>
              <div style={{ fontSize: 12, color: '#60a5fa', fontFamily: 'monospace', lineHeight: 1.6 }}>{p.output}</div>
            </div>
          </div>

          {/* Explanation */}
          <div style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Lightbulb size={12} color="#4ade80" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '.06em' }}>Explanation</span>
            </div>
            <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{p.explanation}</p>
          </div>

          {/* Pseudocode */}
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Approach (pseudocode)</div>
            <pre style={{ fontSize: 12, color: '#a5f3fc', fontFamily: 'monospace', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{p.pseudocode}</pre>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href={p.leetcode} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px',
              background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)',
              borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#fbbf24', textDecoration: 'none',
            }}>
              <ExternalLink size={11} /> LeetCode
            </a>
            <a href={p.gfg} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px',
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#4ade80', textDecoration: 'none',
            }}>
              <ExternalLink size={11} /> GFG
            </a>
            <a href={p.tamil} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#f87171', textDecoration: 'none',
            }}>
              <Play size={11} /> YouTube Tamil
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function BeginnerDSAPage() {
  const [activeTopic, setActiveTopic] = useState('arrays')
  const topic = TOPICS.find(t => t.id === activeTopic)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: "'DM Sans','Inter',sans-serif" }}>

      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/dashboard/problems" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: '#6b7280', fontSize: 13, textDecoration: 'none',
          transition: 'color .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#d1d5db'}
          onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
        >
          <ArrowLeft size={14} /> Back to problems
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1e0a 100%)',
        border: '1px solid rgba(34,197,94,0.15)', padding: '2rem', marginBottom: '2rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .05,
          backgroundImage: 'linear-gradient(rgba(34,197,94,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.4) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12,
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 20, padding: '4px 12px',
          }}>
            <BookOpen size={12} color="#4ade80" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '.08em' }}>Beginner track</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
            New to coding? <span style={{ color: '#4ade80' }}>Start here.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, maxWidth: 500, marginBottom: '1.25rem' }}>
            Step-by-step problems with clear explanations, input/output examples, and YouTube videos in Tamil. No prior knowledge needed.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { n: TOPICS.reduce((a,t) => a+t.problems.length, 0), label: 'problems' },
              { n: TOPICS.length, label: 'topics' },
              { n: '100%', label: 'free' },
            ].map(({ n, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{n}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tamil channels strip */}
      <div style={{
        background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 14, padding: '12px 16px', marginBottom: '1.5rem',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <Play size={14} color="#f87171" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#f87171' }}>Tamil YouTube channels:</span>
        </div>
        {TAMIL_CHANNELS.map(ch => (
          <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: 12, fontWeight: 600, color: '#fca5a5',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 8, padding: '3px 10px', textDecoration: 'none',
          }}>
            {ch.name}
          </a>
        ))}
      </div>

      {/* Topic tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TOPICS.map(t => (
          <button key={t.id} onClick={() => setActiveTopic(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            borderRadius: 12, border: activeTopic === t.id ? `1px solid ${t.border}` : '1px solid #1f2937',
            background: activeTopic === t.id ? t.bg : '#111827',
            cursor: 'pointer', transition: 'all .15s',
          }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: activeTopic === t.id ? t.color : '#6b7280', fontFamily: 'monospace' }}>{t.icon}</span>
            <span style={{ fontSize: 13, fontWeight: activeTopic === t.id ? 700 : 500, color: activeTopic === t.id ? 'white' : '#6b7280' }}>{t.title}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20,
              background: activeTopic === t.id ? t.bg : 'rgba(255,255,255,0.05)',
              color: activeTopic === t.id ? t.color : '#4b5563',
            }}>{t.problems.length}</span>
          </button>
        ))}
      </div>

      {/* Topic content */}
      {topic && (
        <div>
          {/* Topic header */}
          <div style={{
            background: topic.bg, border: `1px solid ${topic.border}`,
            borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `${topic.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900, color: topic.color, fontFamily: 'monospace', flexShrink: 0,
              }}>{topic.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>{topic.title}</div>
                <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, marginBottom: 10 }}>{topic.description}</p>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '8px 12px',
                  display: 'flex', gap: 8,
                }}>
                  <CheckCircle size={13} color={topic.color} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}><strong style={{ color: topic.color }}>Concept:</strong> {topic.conceptNote}</p>
                </div>
              </div>
              <a href={topic.youtubeSearch} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10, fontSize: 12, fontWeight: 700, color: '#f87171',
                textDecoration: 'none', flexShrink: 0,
              }}>
                <Play size={12} /> Tamil videos
              </a>
            </div>
          </div>

          {/* Problems */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>
              {topic.problems.length} problems — click any to expand
            </div>
            {topic.problems.map(p => <ProblemCard key={p.id} p={p} />)}
          </div>

          {/* Next topic nudge */}
          {TOPICS.findIndex(t => t.id === activeTopic) < TOPICS.length - 1 && (
            <div style={{
              background: '#111827', border: '1px solid #1f2937', borderRadius: 14,
              padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 10,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>Done with {topic.title}?</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Move on to the next topic</div>
              </div>
              <button
                onClick={() => {
                  const idx = TOPICS.findIndex(t => t.id === activeTopic)
                  setActiveTopic(TOPICS[idx + 1].id)
                  window.scrollTo(0, 0)
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px',
                  background: '#22c55e', border: 'none', borderRadius: 10,
                  fontSize: 13, fontWeight: 700, color: '#000', cursor: 'pointer',
                }}
              >
                Next: {TOPICS[TOPICS.findIndex(t => t.id === activeTopic) + 1].title} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}