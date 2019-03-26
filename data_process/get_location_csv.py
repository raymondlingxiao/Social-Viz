def get_dict(path, dic):
    with open(path, 'r') as f:
        f.readline()
        cur_line = f.readline()
        while cur_line:
            name, lat, long = cur_line.split(',')
            name = name.replace(' | ', ',')
            dic[name] = [lat, long]
            cur_line = f.readline()


def append_csv(path, dic):
    incoming = open('locations.txt', 'r')
    with open(path, 'w') as outcome:
        cur_line = incoming.readline().strip()
        while cur_line:
            outcome.writelines('"{}", {}, {}'.format(cur_line, dic[cur_line][0], dic[cur_line][1]))
            cur_line = incoming.readline().strip()

    incoming.close()


if __name__ == '__main__':
    dic = {}
    get_dict('latlong.csv', dic)
    append_csv('loc_latlong.csv', dic)