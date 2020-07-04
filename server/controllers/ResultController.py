from models.Result import Result
from flask import jsonify

class ResultController():

    def __init__(self):
        pass

    def get(self, request):
        print('ok')
        offset =  0 if request.args.get('offset') is None else request.args.get('offset')
        quantity = 50 if request.args.get('quantity') is None else request.args.get('quantity')
        data = Result.get(offset, quantity)
        results = []
        for r in data:
            results.append(r.serialize())
        return jsonify(results)


result_controller = ResultController()

    