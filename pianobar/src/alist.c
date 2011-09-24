/*
 * alist.c
 * 
 * -vk
 */

#include <cc/alist.h>
SOURCE_DECL

#define START_SZ	1 << 4

alist* AL_new() {
	alist* al;
	safe_new(al, alist, return NULL);
	al->cur = 0;
	al->max = START_SZ;
	safe_calloc(al->arr, cval, al->max, return NULL);
	return al;
}

void AL_free(alist* li) {
	if (li->arr == NULL) return;
	free(li->arr);
	free(li);
}

void AL_resize(alist* li, size_t len) {
	if (li->arr == NULL) return;
	li->max = len;
	li->arr = realloc(li->arr, sizeof(cval) * len);
}

void AL_insert(alist* li, size_t idx, cval data) {
	if (li->arr == NULL) return;
	if (li->cur + 1 >= li->max) {
		AL_resize(li, li->max * 2);
		AL_insert(li, idx, data);
	} else {
		if (idx == li->cur) {
			li->arr[li->cur++] = data;
		} else if (idx < li->cur) {
			for (size_t i = li->cur; i >= idx; --i) {
				li->arr[i+1] = li->arr[i];
			}
			li->arr[idx] = data;
			++li->cur;
		} else return;
	}
}

cval AL_remove(alist* li, size_t idx) {
	if (li->arr == NULL) return nil;
	if (idx <= li->cur) {
		cval tmp = li->arr[idx];
		for (size_t i = idx; i < li->cur; ++i) {
			li->arr[i] = li->arr[i+1];
		}
		--li->cur;
		return tmp;
	} else return nil;
}

void AL_push_back(alist* li, cval data) {
	AL_insert(li, li->cur, data);
}

cval AL_pop_back(alist* li) {
	if (li->arr == NULL) return nil;
	return li->arr[--li->cur];
}

void AL_foreach(alist* li, foreach_fn fn, cval ctx) {
	if (li->arr == NULL) return;
	for (size_t i = 0; i < li->cur; ++i) {
		fn(li->arr[i], ctx);
	}
}

#ifndef NDEBUG
void AL_pprint(alist* li) {
	printf("[");
	for (size_t i = 0; i < li->cur; ++i) {
		printf("%ld", li->arr[i].i64);
		if (i == li->cur - 1) {
			printf("]\n");
		} else {
			printf(", ");
		}
	}
}
#endif

SOURCE_END
