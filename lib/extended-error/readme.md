# Описание

`ExtendedError` - это класс, предназначенный для создания и обработки пользовательских ошибок в TypeScript. Он расширяет
встроенный класс `Error` и предоставляет дополнительные возможности для передачи пользовательских данных в ошибку и ее
логирования.

## Использование

```typescript
export class ExtendedError<T> extends Error {
    data: T;
    constructor(name: string, message: string, data: T) {
        super(message);
        this.name = name;
        this.data = data;
    }

    logError() {
        console.error(`${this.name}: ${this.message}`);
        console.error('Additional Data:', this.data);
    }
}

type ErrorDataType = {
    a: number,
    b: number,
    time: Date
}

function sumNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        const errorData: ErrorDataType = { a , b , time: new Date()}
        throw new ExtendedError('WrongDataTypeForSumError' , 'Неверный тип данных для суммирования', errorData);
    }

    return a + b;
}


try {
    const result = sumNumbers(5, 5);
    console.log('Результат:', result);
} catch (error) {
    if ( error instanceof ExtendedError) {
        error.logError()
    } else {
        console.error('Произошла другая ошибка:', error.message);
    }
}

```

## Параметры

- `name` (строка): Уникальное имя для ошибки.
- `message` (строка): Текстовое описание ошибки.
- `data` (любой тип `T`): Дополнительные данные, которые могут быть прикреплены к ошибке.

## Возвращаемое значение

Класс `ExtendedError` не возвращает значения. Он используется для генерации и обработки ошибок в коде.

## Обработка ошибок

Для обработки ошибок, сгенерированных классом `ExtendedError`, вы можете использовать блок `try...catch`. В приведенном
выше примере кода, если произойдет ошибка типа `ExtendedError`, она будет обработана с помощью метода `logError()`,
который выведет имя ошибки, сообщение и дополнительные данные об ошибке. В противном случае, будет выведено сообщение о
другой ошибке.
