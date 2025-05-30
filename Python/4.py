while True:
    number = input('Введите число: ')
    if number.lower() == 'exit':
        print('Выход из программы...')
        break
    if number.lstrip('-').isdigit():
        numb_digits= len(number.lstrip('-'))
        print(f'В этом числе {numb_digits} цифры.')
    else:
        print('Ошибка: данные не являются числом')