export type Line = ['d' | 'p', string, string]

export const THREADS: Record<number, Line[]> = {
  1: [
    ['d', 'Hello! How have you been feeling since the last visit?', 'Здравствуйте! Как вы себя чувствуете после прошлого визита?'],
    ['p', 'Much better, but my blood pressure is sometimes 135 over 85.', 'Намного лучше, но давление иногда 135 на 85.'],
    ['d', 'That is slightly high. Please measure it every morning and send me the numbers for a week.', 'Это немного повышено. Измеряйте давление каждое утро и пришлите мне цифры за неделю.'],
    ['p', 'Will do. Should I change the dose of my pills?', 'Хорошо. Нужно ли менять дозировку таблеток?'],
    ['d', 'Not yet. Take care and rest well!', 'Пока нет. Берегите себя и хорошо отдыхайте!'],
  ],
  2: [
    ['d', 'Good afternoon. Your test results are ready.', 'Добрый день. Результаты ваших анализов готовы.'],
    ['p', 'Great, is everything fine?', 'Отлично, всё в порядке?'],
    ['d', 'Yes, all values are within the normal range. Your results look good.', 'Да, все показатели в пределах нормы. Анализы хорошие.'],
    ['p', 'Thank you, doctor!', 'Спасибо, доктор!'],
  ],
  3: [
    ['d', 'Hello, I looked at the photo of the rash you sent.', 'Здравствуйте, я посмотрел фото сыпи, которое вы прислали.'],
    ['p', 'And what do you think?', 'И что вы думаете?'],
    ['d', 'It looks like a mild allergic reaction. Use the cream twice a day and avoid new cosmetics.', 'Похоже на лёгкую аллергическую реакцию. Мажьте крем дважды в день и не используйте новую косметику.'],
    ['p', 'Understood, thank you.', 'Понятно, спасибо.'],
    ['d', 'See you next week for a check.', 'Увидимся на следующей неделе на контроле.'],
  ],
  4: [
    ['d', 'Hello, how is your headache today?', 'Здравствуйте, как сегодня головная боль?'],
    ['p', 'It is better in the morning but returns in the evening.', 'Утром легче, но к вечеру возвращается.'],
    ['d', 'I will adjust your treatment. The prescription was sent to your pharmacy.', 'Скорректирую лечение. Рецепт отправлен в вашу аптеку.'],
    ['p', 'Thank you!', 'Спасибо!'],
  ],
  5: [
    ['d', 'Hello, I have reviewed your ECG.', 'Здравствуйте, я изучила вашу ЭКГ.'],
    ['p', 'Is there anything to worry about?', 'Есть ли повод для беспокойства?'],
    ['d', 'No, the rhythm is normal. Any questions?', 'Нет, ритм нормальный. Есть вопросы?'],
    ['p', 'Can I continue with light sports?', 'Можно ли продолжать лёгкие тренировки?'],
    ['d', 'Yes, light exercise is good for you.', 'Да, лёгкие нагрузки вам полезны.'],
  ],
  6: [
    ['d', 'Hello, how is the temperature of your child now?', 'Здравствуйте, какая сейчас температура у вашего ребёнка?'],
    ['p', '37.2, and the cough is almost gone.', '37,2, а кашель почти прошёл.'],
    ['d', 'Good. Keep giving plenty of water. A follow-up is scheduled.', 'Хорошо. Продолжайте давать много воды. Контрольный приём назначен.'],
  ],
  7: [
    ['d', 'Good morning. Your lab results are in.', 'Доброе утро. Результаты анализов пришли.'],
    ['p', 'How is my blood sugar?', 'Что с сахаром в крови?'],
    ['d', 'Fasting glucose is 5.4 mmol/L, which is normal. Keep the same diet.', 'Глюкоза натощак 5,4 ммоль/л, это норма. Продолжайте то же питание.'],
    ['p', 'Great news, thank you!', 'Отличные новости, спасибо!'],
  ],
  8: [
    ['d', 'Hello, how is your knee after the exercises?', 'Здравствуйте, как колено после упражнений?'],
    ['p', 'The pain is much weaker, but it clicks on stairs.', 'Боль сильно слабее, но на лестнице щёлкает.'],
    ['d', 'That is common. Physical therapy is recommended for another three weeks.', 'Это бывает. Рекомендую заниматься лечебной физкультурой ещё три недели.'],
    ['p', 'Okay, I will continue.', 'Хорошо, продолжу.'],
  ],
  9: [
    ['d', 'Hello, how is your stomach after changing the diet?', 'Здравствуйте, как желудок после смены питания?'],
    ['p', 'Better, but spicy food still causes discomfort.', 'Лучше, но острая пища всё ещё вызывает дискомфорт.'],
    ['d', 'Avoid spicy and fried food for two more weeks. Dietary changes suggested earlier still apply.', 'Исключите острое и жареное ещё на две недели. Ранее советованные изменения в питании остаются в силе.'],
  ],
}
