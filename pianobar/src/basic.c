/*
 * basic.c
 *
 * -vk
 */

#include <cc/basic.h>
SOURCE_DECL

#ifndef NDEBUG
void debugf(const char* fmt, ...) {
	va_list ap;
	va_start(ap, fmt);
	vfprintf(stderr, fmt, ap);
	va_end(ap);
	fprintf(stderr, "\n");
	fflush(stderr);
}
#endif

void bprint(char* data, size_t len) {
	for (size_t i = 0; i < len; ++i) {
		printf("%d ", (int) data[i]);
	}
	printf("\n");
}

int DTOR_free(cval data, cval ctx) {
	(void) ctx;
	if (data.ptr) {
		free(data.ptr);
	}
	return 0;
}

u32 fnv_hash(const u8* val, size_t len) {
	const unsigned char* p = val;
	unsigned h = 2166136261;

	for (size_t i = 0; i < len; ++i) {
		h = (h * 16777619) ^ p[i];
	}

	return h;
}

u32 cvpod_hash(const cval pod) {
	return fnv_hash(&pod.ui8, sizeof(cval));
}

u32 str_hash(const cval val) {
	unsigned char* p = val.ptr;
	unsigned h = 2166136261;

	for (int i = 0; p[i] != '\0'; ++i) {
		h = (h * 16777619) ^ p[i];
	}

	return h;
}

void* RAND_new() {
	FILE* rs = fopen("/dev/urandom", "rb");
	if (rs == NULL)
		srand((ulong) &rs);
	return rs;
}

void RAND_get(void* state, char* buf, size_t len) {
	if (state) {
		if (fread(buf, 1, len, (FILE*) state) == 0) {
			state = NULL;
			RAND_get(NULL, buf, len);
		}
	} else {
		for (u32 pos = 0; pos < len; pos += 4) {
			int r = rand();
			memcpy(buf + pos, &r, (len - pos) % 4);
		}
	}
}

void RAND_free(void* state) {
	fclose(state);
}

SOURCE_END
