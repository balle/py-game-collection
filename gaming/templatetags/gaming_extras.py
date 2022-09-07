from django.template.defaulttags import register

@register.filter
def get_value_from_dict(dictionary, key):
    return dictionary.get(key)
