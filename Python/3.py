age_in = input('Введите ваш возраст: ')

if not age_in.isdigit():
    print('Ошибка: введено не число')
else:
    age = int(age_in)
    if age < 0:
        print('Ошибка: вы ввели отрицательное число')
    elif age >= 18:
        print('Вы совершеннолетний')
    else:
        print('Вы не совершеннолетний')