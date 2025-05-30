input_data = input("Введите числа через пробел: ").split()
power = int(input("Введите степень: "))

result = []

for element in input_data:
    if element.lstrip('-').replace('.', '', 1).isdigit():
        num = float(element)
        if num.is_integer():
            num = int(num)
            result.append(num ** power)
    else:
        result.append(element * power)


print("Вывод:", end=' ')
for item in result:
    print(item, end=' ')
print()