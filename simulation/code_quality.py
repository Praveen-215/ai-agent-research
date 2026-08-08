import random


class CodeQuality:

    @staticmethod
    def score(progress, bugs):

        quality = 100

        quality -= bugs * 5

        quality += progress // 10

        quality += random.randint(-3, 3)

        return max(0, min(100, quality))