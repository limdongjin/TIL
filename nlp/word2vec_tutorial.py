import codecs 
from bs4 import BeautifulSoup
from konlpy.tag import Twitter
from gensim.models import word2vec

# In[7]:


# 파일 열기
def run():
    t = Twitter()
    print("go")
    readFp= codecs.open('wiki.txt', 'r', encoding='utf-8')
    wakati_file = 'wiki.wakati'
    writeFp = open(wakati_file, 'w', encoding='utf-8')
    print("g")

    try:
        twitter = Twitter()
    except Exception as ex:
        print(ex)

    i = 0
    print("gg")
    while True:
        print(i)
        line = readFp.readline()
        if not line: break
        if i % 20000 == 0:
            print("current - " + str(i))
        i += 1
        malist = twitter.pos(line, norm=True, stem=True)
        r=[]
        for word in malist:
            if not word[1] in ['Josa', 'Eomi', 'Punctuation']:
                writeFp.write(word[0] + ' ')
    writeFp.close()
    print('ok')

if __name__ == '__main__':
    run()
