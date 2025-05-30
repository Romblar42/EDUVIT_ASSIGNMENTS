list1 = input("Введите первый список: ").split()
list2 = input("Введите второй список: ").split()

try:
    nums1 = set(map(int, list1))
    nums2 = set(map(int, list2))
except ValueError:
    print("Error: введите только числа, разделенные между пробелами")
    exit()

common_elements = nums1 & nums2  # или nums1.intersection(nums2)

if common_elements:
    print("Общие элементы:", *common_elements)
else:
    print("Нет общих элементов")