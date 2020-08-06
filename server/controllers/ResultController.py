from models import Result
from flask import jsonify

class ResultController():

    def __init__(self):
        pass

    def get(self, request):        
        offset =  0   if request.args.get('offset') is None else request.args.get('offset')
        quantity = 10 if request.args.get('quantity') is None else request.args.get('quantity')        
        instance = '%' if request.args.get('instance') == '' else  request.args.get('instance')
        date = request.args.get('date')
        data = Result.get(offset, quantity, instance, date)
        results = []
        for r in data:
            results.append(r.to_json())
        return jsonify(results)


result_controller = ResultController()
   