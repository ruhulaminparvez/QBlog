from django.shortcuts import render

def my_view(request):
    context = {'foo': 'bar'}
    labels = ['asdf','asdf', 'asdf', 'asdf', 'asdf']
    data = [5, 10, 15, 20, 25]
    print('asdfasdf')
    return render(request, 'admin/dashboard.html', {
        'labels': labels,
        'data': data,
    })


