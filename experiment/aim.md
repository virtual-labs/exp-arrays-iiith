Aim of this experiment is to understand the concept, declaration, and usage of arrays in computer programming, and to learn how arrays can be used to efficiently store, access, and manipulate collections of data of the same type.

Arrays are fundamental data structures that allow programmers to store multiple values under a single variable name, with each value accessible by its index. For example, an integer array can store a sequence of numbers such as students' marks, sensor readings, or any list of values.

**Example:**

Suppose we declare an integer array in C:

```c

int myArray[5];
myArray[0] = 10;
myArray[1] = 20;
myArray[2] = 30;
myArray[3] = 40;
myArray[4] = 50;
```

Here, `myArray` can store 5 integers. The first element is accessed with index 0, and the last element with index 4 (since array indices start from 0). In general, for an array of size $n$, the valid indices are $0$ to $n-1$.

Arrays are like shelves with numbered compartments, where each compartment (index) holds a value. This makes it easy to process large amounts of data using loops and algorithms.
