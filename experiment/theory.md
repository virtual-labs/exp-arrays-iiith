### What is an Array?

An **array** is a data structure that stores a collection of elements of the same datatype in contiguous memory locations. Each element in an array can be uniquely identified and accessed using an integer index. This makes arrays efficient for storing and processing large amounts of data.

### Memory Layout and Indexing

The memory for an array is allocated contiguously. For example, an array of 10 integers (indices 0 through 9) might be stored at memory addresses 2000, 2004, 2008, ..., 2036 (assuming 4 bytes per integer). The address of the element at index $i$ is given by:

$$
	ext{Address of arr}[i] = \text{Base Address} + (\text{Size of each element}) \times i
$$

#### Example: Declaring and Using Arrays

```c

int arr[5];
arr[0] = 10;
arr[1] = 20;
arr[2] = 30;
arr[3] = 40;
arr[4] = 50;
```

Here, `arr` is an integer array of size 5. The valid indices are 0 to 4.

### Multidimensional Arrays

Arrays can also be multidimensional. For example, a 2D array is an array of arrays:

```c

int arr[10][20];
arr[5][3] = 1;
```

Here, `arr` is a 2D array with 10 rows and 20 columns. `arr[5][3]` refers to the 4th element of the 6th row (since indexing starts at 0).

Similarly, a 3D array can be declared as:

```c

int arr[10][20][30];
arr[2][3][4] = 1;
```

This is an array of 10 blocks, each containing 20 arrays of 30 integers.

### Traversing Arrays

You can access all elements of a multidimensional array using nested loops:

```c

for (int i = 0; i < 10; i++)
    for (int j = 0; j < 20; j++)
        for (int k = 0; k < 30; k++)
            arr[i][j][k] = 0;
```

### Arrays vs. Individual Variables

While you could declare multiple variables instead of an array (e.g., `int a, b, c, d, e;`), arrays make it much easier to process collections of data, especially when the number of elements is large or unknown at compile time.

#### Practical Example: Using Arrays

Suppose you want to input 10 numbers and, for a given index $x$ (from 2 to 9), display the average of the neighboring values ($x-1$, $x$, $x+1$):

```c

#include <stdio.h>

int main() {
    int arr[10];
    int i;
    printf("Enter 10 numbers\n");
    for (i = 0; i < 10; i++)
        scanf("%d", &arr[i]);
    printf("Enter an index (2-9) to find average with neighbouring values\n");
    int x;
    scanf("%d", &x);
    printf("Average with neighbouring values is %d\n",
           (arr[x-1] + arr[x] + arr[x+1]) / 3);
    return 0;
}
```

Arrays make such operations simple and efficient. If you had to use individual variables, the code would be much more complex and less scalable.
